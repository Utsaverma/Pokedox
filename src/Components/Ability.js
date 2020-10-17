import React from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';

class Ability extends React.Component {
    constructor(){
        super();
        this.state={
            name:"",
            url:"",
            data:[]
        }
    }
    componentDidMount(){
        let data=[];
        axios.get(this.props.data.url)
        .then(response=>{
            console.log(response.data);
            data=response.data;
            this.setState({url:this.props.data.url,name:data.name,data:data})
        })
        .catch(error=>{
            console.log(error);
        })
        
    }
    render(){
        let objKeys=Object.keys(this.state.data);
        let results=this.state.data;
        return (
            objKeys.length?
                <div className="abilityContainer">
                    <div className="abilityName"><span className="abilityHeaders">Ability Name:</span> <span className="abilityVals">{this.state.name}</span></div>
                    <div>
                        <span className="abilityHeaders">Effect:</span>
                        <span className="abilityVals">
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Effect</th>
                                        <th>Languages</th>
                                        <th>Short Effect</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.effect_entries.map((vals,index)=>{
                                        return <tr key={index}>
                                            <td>{vals.effect}</td>
                                            <td>{vals.language.name}</td>
                                            <td>{vals.short_effect}</td>
                                        </tr>
                                    })}

                                </tbody>
                            </Table>
                        </span>
                    </div>
                    {/*<div>
                     flavour text entries:
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Flavour text</th>
                                    <th>Languages</th>
                                    <th>version group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.flavor_text_entries.map((vals,index)=>{
                                    return <tr key={index}>
                                        <td>{vals.flavor_text}</td>
                                        <td>{vals.language.name}</td>
                                        <td>{vals.version_group.name}</td>
                                    </tr>
                                })}

                            </tbody>
                        </Table> 
                        </div>*/}
                    <div>
                        <span className="abilityHeaders">Ability generation Name:</span>
                        <span className="abilityVals">{results.generation.name}</span>
                    </div>
                    <div>
                        <span className="abilityHeaders">Ability id:</span>
                        <span className="abilityVals">{results.id}</span>
                    </div>
                    <div className="lastCellAbility">
                        <span className="abilityHeaders">Ability from main series:</span>
                        <span className="abilityVals">{results.is_main_series?"Yes":"No"}</span>
                    </div>
                    {/* <div>Ability Name is Diff Languages:
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Languages</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.names.map((vals,index)=>{
                                    return <tr key={index}>
                                        <td>{vals.language.name}</td>
                                        <td>{vals.name}</td>
                                    </tr>
                                })}

                            </tbody>
                        </Table> 
                        </div>*/}
                </div>:null

        );
    }
}
export default Ability;