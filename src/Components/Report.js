import { useState, useEffect } from "react";
import db from "../Db";


const Report = () =>{
const [reportdata, setReportdata] = useState([])
const [showmodal, setShowmodal] = useState(true)
const [modaldata, setModaldata] = useState([])
    useEffect(() => {
        db.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
            setReportdata(result.rows.filter((d) => d.doc.type === "saleorder"))
        }).catch(function (err) {
            console.log(err);
        });
    }, [])

    return(
        <div className="border" style={{ height: '80vh', overflowY: 'scroll' }}>
         <h2 className="text-center">Sale report</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Order id</th>
                        <th scope="col">Total</th>
                        <th scope="col">Created date</th>
                    </tr>
                </thead>
                <tbody>
                    {reportdata && reportdata.map((d,i) => 
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{d.doc._id}</td>
                            <td>{d.doc.data.reduce((total, d) => total + d.price,0)}</td>
                            <td>{new Date(d.doc.created).toLocaleString()}</td>
                            <td><button onClick={() => {
                                setModaldata(d.doc.data)
                                setShowmodal(!showmodal)}}
                                className="btn text-danger">View</button></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>

            <div hidden={showmodal} className="bg-secondary"
                style={{ width: '300px', height: '500px', position: 'absolute', left: '40%', top: '30%', borderRadius: '10%' }}>
                <div className="p-5">
                    <div style={{backgroundColor:'white', overflowY:'scroll', height:'350px'}}>
                      <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {modaldata && modaldata.map((d,i) =>
                        <tr key={i}>
                        <td>{d.name}</td>
                        <td>{d.qty}</td>
                        <td>{d.price}</td>
                      </tr>
                        )}
                        {
                            modaldata &&
                            <tr>
                                <td><strong>Total</strong></td>
                                <td>{modaldata.reduce((total, d) => total + d.qty,0)}</td>
                                <td>{modaldata.reduce((total, d) => total + d.price,0)}</td>
                            </tr>
                        }
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 d-flex justify-content-center" >
                        <button
                            onClick={() => {
                                setModaldata([])
                                setShowmodal(!showmodal)
                            }}
                            className="btn btn-danger p-2 m-2">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;