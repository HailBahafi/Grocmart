import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Checkbox } from "@mui/material";
import { InputNumber } from "rsuite";
import { RiDeleteBinLine, RiDragMove2Fill } from "react-icons/ri";
import "rsuite/dist/rsuite.css"; //input css

const DraggableRow = ({
    item,
    index,
    handleMoveRow,
    handleCheckbox,
    handleDelete,
    onQuantityChange,
    handleMoveToCart,
    checkboxState,
}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: "row",
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                handleMoveRow(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const [, drag] = useDrag({
        type: "row",
        item: { index },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });

    drag(drop(ref));

    return (
        <tr ref={ref} className="border-b border-gray-400 font-serif text-md">
            <td className="px-2 py-4">
                <div className="flex items-center">
                    <button>
                        <Checkbox
                            color="success"
                            checked={checkboxState}
                            value={item.id || false}
                            onChange={handleCheckbox}
                        />
                    </button>
                    <img
                        src={item.image}
                        alt="/"
                        className="w-20 ml-10 h-28 object-cover"
                    />
                    <div className="flex flex-col pl-2">
                        <p className="font-bold">{item.itemname}</p>
                        <p className="text-sm font-sans">{item.description}</p>
                    </div>
                </div>
            </td>
            <td className="px-36 py-4 text-lg font-mono">${item.currentprice}</td>
            <td className="px-24 py-4 w-50">
                <div
                    className="p-3 text-center font-mono text-xl"
                    style={{ width: 100 }}
                >
                    <InputNumber
                        defaultValue={1}
                        max={15}
                        min={1}
                        onChange={(value) => onQuantityChange(item.id, value)}
                    />
                </div>
            </td>
            <td className="pl-14 py-4">
                <button
                    className="bg-transparent hover:bg-green-700 text-black-700 font-semibold 
                                hover:text-white py-3 px-3 border border-green-500 hover:border-transparent rounded-2xl"
                    onClick={() => handleMoveToCart(item.id)}
                >Add to cart
                </button>
            </td>
            <td className="pl-12 py-4">
                <button onClick={() => handleDelete(item.id)}>
                    <span>
                        <RiDeleteBinLine size={24} />
                    </span>
                </button>
            </td>
            <td className="pl-14 py-4">
                <button className="text-gray-500">
                    <span>
                        <RiDragMove2Fill size={24} />
                    </span>
                </button>
            </td>
        </tr>
    );
};
export default DraggableRow;