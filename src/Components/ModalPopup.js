import React from 'react';
import {Modal,Button,ButtonToolbar,Table,Tab,Nav,Col,Row} from 'react-bootstrap'
import axios from 'axios';
import Ability from './Ability';
import ReadMoreAndLess from 'react-read-more-less';

function GameIndex(props){
    let dataFlag=false;
    if(props.data){
        dataFlag=true;
    }
    return <div>
        {dataFlag?<Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Game Index</th>
                        <th>Version Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((vals,index)=>{
                        return <tr key={index}>
                            <td>{vals.game_index}</td>
                            <td>{vals.version.name}</td>
                        </tr>
                    })}

                </tbody>
        </Table>:null}
        </div>
}
function Stats(props){
    let dataFlag=false;
    if(props.data){
        dataFlag=true;
        props.data.sort(function(a, b) {
            return a.base_stat - b.base_stat;
        })
    }
    return <div>
        {dataFlag?<Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Base Stat</th>
                        <th>Effort</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((vals,index)=>{
                        return <tr key={index}>
                            <td>{vals.base_stat}</td>
                            <td>{vals.effort}</td>
                            <td>{vals.stat.name}</td>
                        </tr>
                    })}

                </tbody>
        </Table>:null}
        </div>
}
function Type(props){
    let dataFlag=false;
    if(props.data){
        dataFlag=true;
        props.data.sort(function(a, b) {
            return a.slot - b.slot;
        })
    }
    return <div>
        {dataFlag?<Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Slot</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((vals,index)=>{
                        return <tr key={index}>
                            <td>{vals.slot}</td>
                            <td>{vals.type.name}</td>
                        </tr>
                    })}

                </tbody>
        </Table>:null}
        </div>
}
function MyVerticallyCenteredModal(props) {
    let keyMap={
        abilities:"Abilities",
        game_indices:"Game Ind.",
        moves:"Moves",
        stats:"Stats",
        types:"Types",
        id:"Id",
        base_experience:"Base Exp.",
        height:"Height",
        order:"order",
        weight:"Weight",
        sprites:"Images"
    }
    let keyArray=["abilities","game_indices","moves","stats","types","sprites"];
    let metaArray=["id","base_experience","height","order","weight"];
    const responseKeys=Object.keys(props.details)
    const renderData=(responseKey,type)=>{
        if(Array.isArray(type)){
            if(responseKey=="abilities"){
                return type.map((innerVal,index)=>{
                    return <Ability key={index} data={innerVal.ability} val={responseKey}/>
                })
            }
            else if(responseKey=="game_indices"){
                return <div className="gameIndexContainer"><GameIndex data={type}/></div>
            }
            else if(responseKey=="moves"){
                return <ul className="moves">
                    <span>{keyMap[responseKey]}</span>
                        {   
                        type.map((innerVal,index)=>{
                            return <li key={index}>{innerVal.move.name}</li>
                        })
                    }
                </ul>
            }
            else if(responseKey=="stats"){
                return <Stats data={type}/>
            }
            else if(responseKey=="types"){
                return <Type data={type}/>
            }
            else{
                return <li>is an array</li>
            }
        }
        else if(type.constructor === Object && responseKey=="sprites"){
            let spritesKeys=Object.keys(type);
            return spritesKeys.map((image,index)=>{
                return <li key={index}><img src={type[image]} alt={image} height="42" width="42"></img></li>
            })
        }
        else{
            return <li>{type}</li>;
        }
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.name.toUpperCase()}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                responseKeys.length?<Row className="metaData">
                    {
                        metaArray.map((metaData,index)=>{
                        return <Col key={index}><span className="metaleftCell">{keyMap[metaData]}</span>:<span className="metarightCell">{props.details[metaData]}</span></Col>
                        })
                    }
                </Row>:null
            }
            {
                responseKeys.length?<Tab.Container id="left-tabs-example" defaultActiveKey="abilities">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                    {
                        keyArray.map((leftVals,index)=>{
                           return <Nav.Item key={index}>
                            <Nav.Link eventKey={leftVals}>{keyMap[leftVals]}</Nav.Link>
                            </Nav.Item>
                        })
                     }
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        {
                            keyArray.map((leftVals,index)=>{
                            return <Tab.Pane eventKey={leftVals} key={index}>
                                {
                                    renderData(leftVals,props.details[leftVals])
                                    //renderData("abilities",props.details.abilities,keyMap["abilities"])
                                }
                                </Tab.Pane>
                            })
                        }
                        
                        <Tab.Pane eventKey="second">
                            second
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>:null
            }
        </Modal.Body>
      </Modal>
    );
  }
  
function ModalPopup(props) {
const [modalShow, setModalShow] = React.useState(false);
const [pokemonDetails,setPokemonDetails]=React.useState("");
const funCall=()=>{
    axios.get(props.pokemon.url)
    .then(response=>{
        setPokemonDetails(response.data);
    })
    .catch(error=>{
        console.log(error)
    })
}
const openPopUp=()=>{
    funCall();
    setModalShow(true)
}
return (
    <ButtonToolbar>
    <Button variant="primary" onClick={() => openPopUp()}>
    {props.pokemon.name.toUpperCase()}
    </Button>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={props.pokemon.name}
        details={pokemonDetails}
    />
    </ButtonToolbar>
);
}
  
export default ModalPopup;