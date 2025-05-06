import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Página Não Encontrada
        </h2>
        <p className="text-gray-600 mt-2">
          A página que você está procurando não existe. Verifique a URL ou volte para a página inicial.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="text-white bg-amber-500 hover:bg-amber-700 font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
