import React, {Component} from 'react';



class App extends Component{
  constructor(){
    super();
    this.state = {
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      puesto: '',
      area: '',
      jefe: '',
      horaEntrada: '',
      horaComida: '',
      horaSalida: '',
      info: [],
      _id: ''
    };
    this.addInfo=this.addInfo.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
    addInfo(e){
      if(this.state._id){
          fetch(`/parques/update/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res=>res.json())
          .then(data => {
            M.toast({html: 'Informacion guardada'});
            this.setState({
              nombre: '',
              apellidoP: '',
              apellidoM: '',
              puesto: '',
              area: '',
              jefe: '',
              horaEntrada: '',
              horaComida: '',
              horaSalida: '',
              _id: ''
            });
            this.fetchInfo();
          });
      }
      else{
        fetch('/parques/park-send', {
          method:'POST',
          body: JSON.stringify(this.state),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Informacion guardada'});
          this.setState({
            nombre: '',
            apellidoP: '',
            apellidoM: '',
            puesto: '',
            area: '',
            jefe: '',
            horaEntrada: '',
            horaComida: '',
            horaSalida: '',
          });
          this.fetchInfo();
        })
        .catch(err => console.log(err));
      }
      e.preventDefault();
    } 

    componentDidMount(){
      this.fetchInfo();
    }

    fetchInfo(){
      fetch('/parques')
      .then(res => res.json())
      .then(data => {
        this.setState({info: data});
        });
    }

    deleteInfo(id){
        if(confirm('Seguro que lo quieres eliminar?')){
          fetch(`/parques/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }).then(res => res.json()).then(data => {
            console.log(data)
            M.toast({html: 'Informacion eliminada'});
            this.fetchInfo();
          
          });
        }
    }

    editInfo(id){
      if(confirm('Seguro que lo quieres editar?')){
        fetch(`/parques/${id}`)
          .then(res => res.json()).
          then(data => {
            this.setState({
              nombre: data.nombre,
              apellidoP: data.apellidoP,
              apellidoM: data.apellidoM,
              puesto: data.puesto,
              area: data.area,
              jefe: data.jefe,
              horaEntrada: data.horaEntrada,
              horaComida: data.horaComida,
              horaSalida: data.horaSalida,
              _id: data._id
            })
            /* M.toast({html: 'Informacion eliminada'});
            this.fetchInfo(); */
        
        });
      }
  }

    handleChange(e){
      const {name, value} = e.target;
      this.setState({
        [name]: value
      })
    }

    render(){
      return (
            <div>
                <nav className="cyan darken-3">
                  <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Recursos Humanos</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                      <li><a href="/">Inicio</a></li>
                      <li><a href="/">Panel de control</a></li>
                      <li><a href="/">Información</a></li>
                    </ul>
                  </div>
                </nav>

                <div className="teal lighten-5">
                    <div className="row"> 
                      <div className="col s2"> 
                          <div className=""> 
                              <div className="card-panel hoverable"> 
                                <form onSubmit={this.addInfo}>
                                  <div className="row">
                                    <div className="input-field col s12">
                                      <h4 className="center-align">Formulario</h4>
                                      <p className="center-align">nombre</p>
                                      <input name="nombre" onChange={this.handleChange} type="text" value={this.state.nombre}/>
                                      <p className="center-align">apellidoP</p>
                                      <input name="apellidoP" onChange={this.handleChange} type="text" value={this.state.apellidoP}/>
                                      <p className="center-align">apellidoM</p>
                                      <input name="apellidoM" onChange={this.handleChange} type="text" value={this.state.apellidoM}/>
                                      <p className="center-align">puesto</p>
                                      <input name="puesto" onChange={this.handleChange} type="text" value={this.state.puesto}/>
                                      <p className="center-align">area</p>
                                      <input name="area" onChange={this.handleChange} type="text" value={this.state.area}/>
                                      <p className="center-align">jefe</p>
                                      <input name="jefe" onChange={this.handleChange} type="text" value={this.state.jefe}/>
                                      <p className="center-align">horaEntrada</p>
                                      <input name="horaEntrada" onChange={this.handleChange} type="text" value={this.state.horaEntrada}/>
                                      <p className="center-align">horaComida</p>
                                      <input name="horaComida" onChange={this.handleChange} type="text" value={this.state.horaComida}/>
                                      <p className="center-align">horaSalida</p>
                                      <input name="horaSalida" onChange={this.handleChange} type="text" value={this.state.horaSalida}/>
                                      <div className="col s12 center-align">
                                        <button className="btn cyan darken-3 waves-effect waves-light" type="submit">Enviar
                                          <i className="material-icons right">send</i>
                                        </button>
                                      </div>
                                      
                                      {/* <input type='submit' /> */}
                                    

                                    </div>

                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                      <div className="col s10"> 
                          <table className="responsive-table card-panel hoverable centered highlight">
                            <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>apellidoP</th>
                                  <th>apellidoM</th>
                                  <th>puesto</th>
                                  <th>area</th>
                                  <th>jefe</th>
                                  <th>horaEntrada</th>
                                  <th>horaComida</th>
                                  <th>horaSalida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.info.map(info => {
                                  return (
                                    <tr key={info._id}>
                                      <td>{info.nombre}</td>
                                      <td>{info.apellidoP}</td>
                                      <td>{info.apellidoM}</td>
                                      <td>{info.puesto}</td>
                                      <td>{info.area}</td>
                                      <td>{info.jefe}</td>
                                      <td>{info.horaEntrada}</td>
                                      <td>{info.horaComida}</td>
                                      <td>{info.horaSalida}</td>
                                      <td>
                                          <button className="btn cyan darken-3 waves-effect waves-light" style={{margin: '1px'}} onClick={() => this.editInfo(info._id) }>
                                          <i className="material-icons">edit</i>
                                          </button>
                                          <button className="btn cyan darken-3 waves-effect waves-light" onClick={() => this.deleteInfo(info._id)}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                      </td>
                                    </tr>
                                  )
                                })
                                }
                            </tbody>
                          </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
  }
  
  export default App;