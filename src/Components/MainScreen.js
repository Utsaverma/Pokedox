import React from 'react';
import axios from 'axios';
import ModalPopup from './ModalPopup';
import Select from 'react-select';
import {Row,Col,Button} from 'react-bootstrap';

class MainScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count:0,
            filterCount:0,
            next:"",
            previous:"",
            results:[],
            allResults:[],
            //abilityData:[]
        }
    }
    componentDidMount(){
        axios.get("https://pokeapi.co/api/v2/pokemon/")
        .then(response=>{
            this.setState({count:response.data.count,next:response.data.next,previous:response.data.previous,results:response.data.results,filterCount:response.data.count})
            this.getAllData(response.data.count)
        })
        .catch(error=>{
            console.log(error);
        })
       
    }
    getAllData=(count)=>{
        axios("https://pokeapi.co/api/v2/pokemon/?offset=0&limit="+count)
        .then(response=>{
            this.setState({allResults:response.data.results})
        })
        .catch(error=>{
            console.log(error)
        })
        // axios("https://pokeapi.co/api/v2/ability/")
        // .then(res=>{
        //     console.log(res.data)
        //     axios("https://pokeapi.co/api/v2/ability/?offset=0&limit="+res.data.count)
        //     .then(response=>{
        //         console.log(response.data)
        //         this.setState({abilityData:response.data.results})
        //     })
        //     .catch(error=>{
        //         console.log(error)
        //     })
        // })
        // .catch(error=>{
        //     console.log(error)
        // })
    }
    loadData=(loadUrl)=>{
        axios.get(loadUrl)
        .then(response=>{
            this.setState({count:response.data.count,next:response.data.next,previous:response.data.previous,results:response.data.results,filterCount:response.data.count})
        })
        .catch(error=>{
            console.log(error);
        })
    }
    applyNameFilters=(nameList)=>{
        console.log(nameList)
        if(nameList==null || nameList.length==0){
            this.clearFilters();
        }
        else{
            let newNameList=[];
            nameList.map(name=>
                newNameList.push(name.value))
            //console.log("to be filtered",nameList)
            let filtVals=this.state.allResults.filter(function(v){ return newNameList.indexOf(v.name) >= 0;})
            //console.log(filtVals)
            this.setState({next:null,previous:null,filterCount:nameList.length,results:filtVals})
        }
    }
    // applyAbilityFilters=(abilityList)=>{
    //     if(abilityList.length==0){
    //         this.clearFilters();
    //     }
    //     else{
    //         //console.log(abilityList)
    //         let newabilityList=[];
    //         abilityList.map(name=>
    //             newabilityList.push(name.value))
    //         console.log(newabilityList)
    //         //console.log("to be filtered",nameList)
    //         // let filtVals=this.state.allResults.filter(function(v){ return newNameList.indexOf(v.name) >= 0;})
    //         // //console.log(filtVals)
    //         // this.setState({next:null,previous:null,filterCount:nameList.length,results:filtVals})
    //     }
    // }
    clearFilters=()=>{
        this.loadData("https://pokeapi.co/api/v2/pokemon/");
    }
    render(){
        let pokemonList=[];
        let dataToShow=[];
        let sublist=[];
        if(this.state.allResults){
            this.state.allResults.map(pokemon=>{
            let obj={value:pokemon.name,label:pokemon.name.toUpperCase()}
            pokemonList.push(obj)
            })
        }
        if(this.state.results){
            this.state.results.map((pokemon,index)=>{
            if((index+1)%5==0){
                sublist.push(pokemon)
                dataToShow.push(sublist)
                sublist=[];
            }
            else{
                sublist.push(pokemon)
            }
        })
    }
    if(sublist){
        dataToShow.push(sublist)
    }
        // let abilityList=[]
        // if(this.state.abilityData){
        //     this.state.abilityData.map(ability=>{
        //     let obj={value:ability.name,label:ability.name}
        //     abilityList.push(obj)
        //     })
        // }
        return (
            <React.Fragment>
                <div className="headerContainer">
                    <h1 className="header">Welcome to Pokedox</h1>
                </div>
                <div className="resultContainer">
                    <Row className="mainHeader">
                        <Col>
                            <span className="mainHeaders">Total Pokemons :</span> {this.state.count}
                        </Col>
                        <Col>
                            <span className="mainHeaders">Selected Pokemons: </span>{this.state.filterCount}
                        </Col>
                        <Col>
                            <span className="mainHeaders">Search or Select Pokemon:</span>
                        <Select
                            isMulti
                            name="name"
                            options={pokemonList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={val => this.applyNameFilters(val)}
                        />
                        </Col>
                    </Row>
                    {/* <div>Total Pokemons : {this.state.count}</div>
                    <div>Selected Pokemons: {this.state.filterCount}</div> */}
                    {/* <div>Search or Select Pokemon:
                        <Select
                            isMulti
                            name="name"
                            options={pokemonList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={val => this.applyNameFilters(val)}
                        />
                    </div> */}
                    {/* <div>Filter Pokemon by Ability:
                        <Select
                            isMulti
                            name="name"
                            options={abilityList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={val => this.applyAbilityFilters(val)}
                        />
                    </div> */}
                    <ul className="pokemonList">
                        {this.state.results?dataToShow.map((row,rindex)=>{
                            return <Row key={rindex}> {
                                row.map((pokemon,index)=>{
                                    return <Col key={index}><ModalPopup pokemon={pokemon} /></Col>
                                })
                            }
                            </Row>
                        })
                        :null}
                    </ul>
                    {this.state.previous?<Button variant="primary" className="prev" onClick={e=>this.loadData(this.state.previous)}>Less Pokemons</Button>:null}
                    {this.state.next?<Button variant="primary" className="next" onClick={e=>this.loadData(this.state.next)}>More Pokemons</Button>:null}
                </div>
                <marquee>*Click on the Pokemons to get the details like Abilties,Speed,Id,Stats,etc. *To load more Pokemons click More and to see previous Pokemons click Less</marquee>
                <div className="footerContainer">
                    <ul className="footerLinks">
                        <li>© 2020 Pokedox. All Rights Reserved</li>
                        <li><a href="#" target="_blank">Privacy Policy</a></li>
                        <li><a href="#" target="_blank">TPDR Privacy Notice</a></li>
                        <li>Terms & Condition</li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
  
}

export default MainScreen;
