import { useEffect } from "react";
import { deleteYogaClass } from "../../assets/api/admin/deleteYogaClass";

type Props = {
    id: string;
};

const DeleteBtn = ({ id }: Props) => {
    useEffect(() => {
        console.log(id);
    }, [id]);

    const handleDelete = async () => {
        const result = await deleteYogaClass(id);
        if (result && result.success) {
            alert("Yoga class deleted successfully.");
            // Optionally: trigger a refresh or callback here
        } else {
            alert("Failed to delete yoga class.");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="py-2 px-6 bg-mainClr text-sm xs:text-base text-white font-medium rounded-lg border-2 border-mainClr hover:bg-transparent hover:text-black cursor-pointer"
        >
            Delete
        </button>
    );
};

export default DeleteBtn;
