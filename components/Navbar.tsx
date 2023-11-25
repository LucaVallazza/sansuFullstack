import Link from "next/link";

const Navbar = () => {

    

  return (
    <nav className="w-full p-4 bg-slate-800">
      <Link href={"/"}>
        <div className="text-xl font-bold text-slate-100">Sansu</div>
      </Link>
    </nav>
  );
};

export default Navbar;
