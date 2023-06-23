import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react'
import db from '../Db';


const Category = () => {

    const [showcat, Setshowcat] = useState(true)
    const [catinput, Setcatinput] = useState('')
    const [catimg, Setcatimg] = useState('')
    const [catid, Setcatid] = useState('')
    const [catvalue, Setcatvalue] = useState([])
    const [deletecat, Setdeletecat] = useState(true)


    // fetching the data from db

    useEffect(() => {
        db.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
            Setcatvalue(result.rows.filter((d) => d.doc.type === "Category"))
        }).catch(function (err) {
            console.log(err);
        });
    }, [catinput, catid])


// below object is been saved by handlesave function
    const handleSave = (e) => {
        e.preventDefault();
        const cat = {


            type: 'Category',
            name: catinput,
            image: catimg.path,
            created: new Date()



        }
        
        // posting in db

        if (catinput !== '') {
            db.post(cat).then((response) => {
                Setcatinput('')
                Setcatimg('')
                toast.success('Category created')
            }).catch((err) => {
                Setcatinput('')
                Setcatimg('')
                toast.error("Something went wrong")
                console.log(err);
            });
        } else {
            toast.error("Category cannot be empty")
        }
    }

    // deleting in db

    const handleDelete = () =>{
        setTimeout(() => {
            db.get(catid).then((doc) => {
                return db.remove(doc._id, doc._rev);
              }).then(function (result) {
             toast.success("Category deleted")
             Setcatid('')
            }).catch(function (err) {
                console.log(err);
                toast.error("Something went wrong")
                Setcatid('')
              });
        }, 300);

    }
    return (

        <div div className="border" style={{ height: '80vh', overflowY: 'scroll' }}>
            <Toaster />
            <div style={{ marginLeft: '80%' }}>
                <button onClick={() => Setshowcat(!showcat)} className="btn btn-primary m-2">Create category</button>
            </div>
            <h2 className="text-center">Category List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        input
                        <th scope="col">Category image</th>
                        <th scope="col">Created date</th>
                    </tr>
                </thead>
                
                 <tbody>
                    {catvalue && catvalue.sort((a,b) => new Date(b.doc.created) - new Date(a.doc.created)).map((d,i) => 
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{d.doc.name}</td>
                            <td><img style={{height:'120px', width:'150px'}} alt={d.doc.name} src={d.doc.image}/></td>
                            <td>{new Date(d.doc.created).toLocaleString()}</td>
                            <td><button
                            onClick={(e) =>{    
                                e.preventDefault()
                                Setcatid(d.doc._id)
                                Setdeletecat(!deletecat)
                            }}
                             className="btn text-danger">X</button></td>
                        </tr>
                    )
                    }
                </tbody>

            </table>
            {/* CREATE MODAL */}

            <div hidden={showcat} className="bg-primary"
                style={{ width: '350px', height: '250px', position: 'absolute', left: '40%', top: '30%', borderRadius: '10%' }}>
                <div className="p-5">
                    <input value={catinput} onChange={(e) => Setcatinput(e.target.value)}
                        className="form-control mb-2" placeholder="Category name" />
                    <label className="form-label">Category image</label>

                    <input defaultValue=''
                    
                     onChange={(e) =>Setcatimg(e.target.files[0])} className="form-control" type="file" />
                </div>
                <div className="p-5">

                    <button

                        onClick={

                            (e) => {
                                handleSave(e)
                                Setshowcat(!showcat)
                            }}
                        className="btn btn-success p-2 m-2">Create</button>
                    <button
                        onClick={(e) => {
                            Setcatinput('')
                            Setcatimg('')
                            Setshowcat(!showcat)
                        }}
                        className="btn btn-danger p-2 m-2">Cancel</button>
                </div>
            </div>

            {/* delete model  */}

            <div hidden={deletecat} className="bg-primary"
                style={{ width: '300px', height: '200px', position: 'absolute', left: '40%', top: '30%', borderRadius: '10%' }}>
                <div className="p-5">
                    <h4 className="text-center text-danger">Are you sure to delete ?</h4>
                    <div className="mt-4 ms-5">
                        <button  
                            onClick={(e) => {
                                handleDelete()
                                Setdeletecat(!deletecat)
                            }}
                            className="btn btn-success p-2 m-2">Yes</button>
                        <button
                            onClick={() => {
                                Setcatid('')
                                Setdeletecat(!deletecat)
                            }}
                            className="btn btn-danger p-2 m-2">No</button>
                    </div>
                </div>
            </div>
        </div>





    )
}

export default Category;