import { useState } from "react";

export default function ListedCards({...props}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: props.title,
        order: props.order,
        color: props.color,
        description: props.description,
    });

    function handleEdit() {
        setIsEditing(prevState => !prevState);
    }

    function handleChange(e){
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData, [name]: value
        }));
    }

    const handleSave = async (e) => {
        e.preventDefault();

        const response = await fetch("https://localhost:7217/Card/EditCard", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: props.id,
                Title: editData.title,
                Order: editData.order,
                Color: editData.color,
                Description: editData.description,
            })
        })

        if(response.ok) {
            handleEdit();
        } else {
            alert("Error editing data")
        }
    }

    return (
        <li className="pb-4 mb-4 border-b-2 border-b-amber-50">
            {isEditing ? (
                <>
                    <div className="flex">
                        <h3 className="pe-2">Title:</h3><input className="border border-stone-50" name="title" type="text" value={editData.title} onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <p className="pe-2">Order:</p><input className="border border-stone-50" name="order" type="text" value={editData.order} onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <p className="pe-2">Background color:</p><input className="border border-stone-50" name="color" type="color" value={editData.color} onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <p className="pe-2">Short description:</p><input className="border border-stone-50" name="description" type="text" value={editData.description} onChange={handleChange} />
                    </div>
                    <button onClick={handleSave} className="!text-xl text-stone-950 hover:!bg-stone-950 hover:text-stone-50 hover:!border-stone-50 text-nowrap !p-2 my-2">Save</button>
                </>
            ) : (
                <>
                    <h3>Title: {editData.title}</h3>
                    <p>Order: {editData.order}</p>
                    <p>Background color: <span className="text-stone-950" style={{background: `${editData.color}`}}>{editData.color}</span></p>
                    <p>Short description: {editData.description}</p>
                    <button onClick={handleEdit} className="!text-xl text-stone-950 hover:!bg-stone-950 hover:text-stone-50 hover:!border-stone-50 text-nowrap !p-2 my-2">Edit</button>
                </>
            )}

        </li>
    )
}