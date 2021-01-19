// import React from "react"
// import Board from "@lourenci/react-kanban";
// import "@lourenci/react-kanban/dist/styles.css";

// import abi from '../../config/abi';
// import * as func from '../utils';
// import portisWrapper from "../wrapper";
// import LicenseInfo from './licenceUI';
// import Loader from './loader';

// function ControlledBoard() {
//   // You need to control the state yourself.
//   const [controlledBoard, setBoard] = useState(board);

//   function handleCardMove(_card, source, destination) {
//     const updatedBoard = moveCard(controlledBoard, source, destination);
//     setBoard(updatedBoard);
//   }

//   return (
//     <Board onCardDragEnd={handleCardMove} disableColumnDrag>
//       allowRemoveLane
//       allowRenameColumn
//       allowRemoveCard
//       onLaneRemove={this.onLaneRemove}
//       onCardRemove={this.onCardRemove}
//       onLaneRename={this.onLaneRemove}
//       initialBoard={}
//       allowAddCard={{ on: "top" }}
//       onNewCardConfirm={draftCard => ({
//         id: new Date().getTime(),
//         ...draftCard
//       })}
//       onCardNew={console.log}
//     />
//     { columns: softwares }
//     </Board>
//   );
// }


// class CompanyUI extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSwSelect = this.handleSwSelect.bind(this);
//     this.loadSoftwares = this.loadSoftwares.bind(this);
//     this.loadLicense = this.loadLicense.bind(this);
//     this.setLAdmin = this.setLAdmin.bind(this);
//     this.setLOwner = this.setLOwner.bind(this);
//     this.setLDate = this.setLDate.bind(this);
//     this.setLForSale = this.setLForSale.bind(this);

//     let contractAddress = process.env.ROPSTEN_CONTRACT_HANDLER;
//     if (this.props.network && this.props.network.includes('binance')) contractAddress = process.env.BINANCE_CONTRACT_HANDLER;
//     this.state = {
//       contractAddress,
//       softwares: [],
//       licenses: {},
//       currSw: '',
//       currAdmin: '',
//       handlerContract: null,
//     };
//   }

//   componentDidMount() {
//     if (this.props.web3 && this.props.address && this.state.contractAddress) {
//       this.loadSoftwares();
//     }
//   }
