import { useState , useEffect } from "react";
import db from "../Db";
import { Toaster, toast } from "react-hot-toast";


const Product = ()=>{

    const [showprod,Setshowprod] = useState (true)
    const [prodname,Setprodname] = useState('')
    const [prodprice,Setprodprice] = useState('')
    const [prodcat,Setprodcat] = useState('')
    const [prodimg,Setprodimg] = useState('')
    const [prodid,Setprodid] = useState('')
    const [prodvalue,Setprodvalue] = useState([])
    const [categorydata,Setcategorydata] = useState()
    const [deleteprod,Setdeleteprod] = useState(true)


    useEffect(() => {
        db.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
            Setprodvalue(result.rows.filter((d) => d.doc.type === "product"))
            Setcategorydata(result.rows.filter((d) => d.doc.type === "Category"))
        }).catch(function (err) {
            console.log(err);
        });
    }, [prodname, prodprice, prodcat, prodid])

    const handlesave = (e) =>{
        e.preventDefault();

        const prod = {

            type:"product",
            name:prodname,
            category:prodcat,
            image:prodimg.path,
            price:prodprice,
            created: new Date()
    
        }


        if (prodname !==('') & prodcat !==('') & prodimg !== ('') & prodprice !== ('') & prodcat !=="None") {
            db.post(prod).then((response) => {
                Setprodname('')
                Setprodprice('')
                Setprodimg('')
                Setprodcat('')
                toast.success('Product created')
            }).catch((err) => {
                Setprodname('')
                Setprodprice('')
                Setprodimg('')
                Setprodcat('')
                toast.error("Something went wrong")
                console.log(err);
            });
        } else {
            Setprodname('')
            Setprodprice('')
            Setprodimg('')
            Setprodcat('')
            toast.error("All fields required")
        }
    }

    const handleDelete = () =>{
        setTimeout(() => {
            db.get(prodid).then((doc) => {
                return db.remove(doc._id, doc._rev);
              }).then(function (result) {
             toast.success("Product deleted")
             Setprodid('')
            }).catch(function (err) {
                console.log(err);
                toast.error("Something went wrong")
                Setprodid('')
              });
        }, 300);
       
    }

   

  


    

    return (
        <div className="border" style={{ height: '80vh', overflowY: 'scroll' }}>
            <Toaster />
            
            <div style={{ marginLeft: '80%' }}>
                <button
                    onClick={()=> Setshowprod  (!showprod)}
                    className="btn btn-primary m-2">Create product</button>
            </div>
            <h2 className="text-center">Product list</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Product image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Created date</th>
                    </tr>
                </thead>
                <tbody>
                    {prodvalue && prodvalue.map((d, i) =>
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{d.doc.name}</td>
                            <td>{d.doc.category}</td>
                            <td><img style={{ height: '120px', width: '150px' }} alt={d.doc.name} src={d.doc.image} /></td>
                            <td>{d.doc.price}</td>
                            <td>{new Date(d.doc.created).toLocaleString()}</td>
                            <td><button
                                onClick={(e) => {
                                    e.preventDefault()
                                    Setprodid(d.doc._id)
                                    Setdeleteprod(!deleteprod)
                                }}
                                className="btn text-danger">X</button></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>

            {/* CREATE product */}
            <div hidden ={showprod} className="bg-primary"
                style={{ width: '350px', height: '400px', position: 'absolute', left: '40%', top: '30%', borderRadius: '10%' }}>
                <div className="p-5">
                    <input value={prodname} onChange={(e)=> Setprodname(e.target.value)}
                        className="form-control mb-2" placeholder="Product name" />
                    <input value={prodprice} onChange={(e)=> Setprodprice(e.target.value)}
                        className="form-control mb-2" placeholder="Product price" />
                    <label className="form-label"> Select Category</label>

                    <select value={prodcat} 
                    onChange={(e)=> Setprodcat(e.target.value)}
                     className="form-select mb-2">
                        <option>None</option>
                        {categorydata && categorydata.map((d,i)=>

                            <option key={i}>
                                {d.doc.name}
                            
                            </option>


                        )}
                       
                           
                        
                    </select>
                    <label className="form-label">Product image</label>
                    <input defaultValue=''
                        onChange={(e) =>
                         Setprodimg(e.target.files[0])} className="form-control" type="file" />


                    <div className="mt-4 ms-4">
                        <button
                        
                        onClick={(e)=>{

                            handlesave(e)
                            Setshowprod (!showprod)

                        }}
                           
                            className="btn btn-success p-2 m-2">Create</button>
                        <button
                        onClick={()=> {
                            Setprodname('')
                            Setprodcat('')
                            Setprodimg('')
                            Setprodprice('')
                            Setshowprod (!showprod)
                        }}
                            className="btn btn-danger p-2 m-2">Cancel</button>
                    </div>
                </div>
            </div>


            {/* DELETE product */}
             <div hidden={deleteprod} className="bg-primary"
                style={{ width: '300px', height: '200px', position: 'absolute', left: '40%', top: '30%', borderRadius: '10%' }}>
                <div className="p-5">
                    <h4 className="text-center text-danger">Are you sure to delete ?</h4>
                    <div className="mt-4 ms-5">
                        <button  

                        onClick={(e) =>{

                            handleDelete()
                            Setdeleteprod(!deleteprod)
                        }}
                        

                            className="btn btn-success p-2 m-2">Yes</button>
                        <button
                         onClick={() =>{
                            Setdeleteprod(!deleteprod)
                         }}
                        
                            className="btn btn-danger p-2 m-2">No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default  Product;