import { useState } from "react";

export default function ListedContent({...props}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        sectionId: props.sectionId,
        order: props.order,
        textContent: props.textContent,
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

        const response = await fetch("https://localhost:7217/Content/EditContent", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: props.id,
                SectionId: editData.sectionId,
                Order: editData.order,
                TextContent: editData.textContent,
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
                        <h3 className="pe-2">Section id:</h3><input className="border border-stone-50" name="sectionId" type="text" value={editData.sectionId} onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <p className="pe-2">Order:</p><input className="border border-stone-50" name="order" type="text" value={editData.order} onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <p className="pe-2">Text:</p><textarea className="border border-stone-50 w-full" rows="auto" name="textContent" value={editData.textContent} onChange={handleChange} />
                    </div>
                    <button onClick={handleSave} className="!text-xl text-stone-950 hover:!bg-stone-950 hover:text-stone-50 hover:!border-stone-50 text-nowrap !p-2 my-2">Save</button>
                </>
            ) : (
                <>
                    <h3>Section id: {editData.sectionId}</h3>
                    <p>Order: {editData.order}</p>
                    <p>Text: {editData.textContent}</p>
                    <button onClick={handleEdit} className="!text-xl text-stone-950 hover:!bg-stone-950 hover:text-stone-50 hover:!border-stone-50 text-nowrap !p-2 my-2">Edit</button>
                </>
            )}
        </li>
    )
}