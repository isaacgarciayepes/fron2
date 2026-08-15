function Header({ title, description, txtButton }) {
    
    return (
        <div className="flex justify-between items-center mb-8 p-6">
            <div>
                <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
                <p className="text-slate-500 mt-1">{description}</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-while px-5 py-2 rounded-lg font-sans"> {txtButton} </button>
        </div>
    );
}

export default Header;