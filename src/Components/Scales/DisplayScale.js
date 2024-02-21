const DisplayScale = ({notes}) => {

    return (
        <div className={"flex items-start"}>{notes.map((note) =>
            <div key={note} className={"bg-gray-400 rounded-md w-[37px] text-center px-2 py-1 mx-2"}>
                {note}
            </div>)}
        </div>
    );
}

export default DisplayScale;