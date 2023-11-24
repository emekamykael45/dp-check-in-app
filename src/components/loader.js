import loaderWhite from "../assets/svg/loader-white.svg";
import loaderBlue from "../assets/svg/loader-blue.svg";

const Loader = ({ white }) => {
  const src = white ? loaderWhite : loaderBlue;

  return (
    <div className="loader_img_container">
      <img src={src} className="loader_img spinner" alt="Loader img" />
    </div>
  );
};

export default Loader;
