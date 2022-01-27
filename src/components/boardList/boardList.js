import "./boardListStyle.css";

const BoardList = () => {
  return (
    <div className="board-list-container">
      <div className="title">
        <h2 className="mt-4 px-4">My Boards</h2>
      </div>
      <div className="board-lists">
        <ul>
          <li>
            <div class="square">
              <img src="https://unsplash.it/700/200" alt="" />
            </div>
            <p className="px-2">Imag1</p>
          </li>
          <li>
            <div class="square">
              <img src="https://unsplash.it/400/400" alt="" />
            </div>
            <p className="px-2">Imag1</p>
          </li>
          <li>
            <div class="square">
              <img src="https://unsplash.it/300/500" alt="" />
            </div>
            <p className="px-2">
              Imag1dsafasfsafs afsafsafsafassss ssssssssssss
            </p>
          </li>
          <li>
            <div class="square">
              <img
                src="http://localhost:3000/images/scattered-forcefields.svg"
                alt=""
              />
            </div>
            <p className="px-2">Imag1</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BoardList;
