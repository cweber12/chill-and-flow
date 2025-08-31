import { useState } from "react";

// Props: id of yoga class, and optionally current name
// You can extend this to pass more fields for a full update form

type Props = {
    id: string;
    currentName: string;
    onUpdate?: () => void; // callback to refresh list after update
};

const UpdateBtn = ({ id, currentName, onUpdate }: Props) => {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        const newName = prompt("Enter new name", currentName);
        if (!newName || newName === currentName) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("name", newName);
        // Import updateYogaClass dynamically to avoid circular imports
        const { updateYogaClass } = await import("../../assets/api/admin/updateYogaClass");
        await updateYogaClass(id, formData);
        setLoading(false);
        if (onUpdate) onUpdate();
    };

    return (
        <button
            onClick={handleUpdate}
            disabled={loading}
            className="py-2 px-6 bg-yellow-500 text-sm xs:text-base text-white font-medium rounded-lg border-2 border-yellow-500 hover:bg-transparent hover:text-black cursor-pointer ml-2"
        >
            {loading ? "Updating..." : "Update"}
        </button>
    );
};

export default UpdateBtn;
