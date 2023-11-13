
import './App.css';
import React from 'react';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader,FormGroup, ModalFooter} from 'reactstrap'

const data=[
  {id: 1, personaje: "Naruto", anime: "Naruto"},
  {id: 2, personaje: "Goku", anime: "DragonBall"},
  {id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin"},
  {id: 4, personaje: "Monkey D. Luffy", anime: "One Piece"},
  {id: 5, personaje: "Eduard Elric", anime: "FullMetal Alchemist"},
  {id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!"}
];

class App extends React.Component{
  
  state={
    data: data,
    form:{
      id:'',
      personaje:'',
      anime:''
    },
    modalInsertar:false,
    modalEditar:false,

  }

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }
  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }
  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }
  
  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;

    var lista=this.state.data;
    lista.push(valorNuevo);

    this.setState({data:lista,modalInsertar:false})

  }

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].personaje=dato.personaje;
        lista[contador].anime=dato.anime;
      }
      contador++;
    });
    this.setState({data: lista,modalEditar:false});
  }
  
  

  eliminar=(dato)=>{
    var opcion=window.confirm("¿Realmente desea eliminar este registro?"+dato.id);
    if (opcion){
      var contador=0;
      var lista = this.state.data;

      lista.map((registro)=>{
        if(registro.id==dato.id){
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({data:lista});
    }
  }

  render(){
    return(
      <>
      <Container>
      <br></br>
      <div>
        <Button color='success' onClick={()=>this.mostrarModalInsertar()}>Insertar Nuevo Personaje</Button>
      </div>
      <br></br>
      <Table>
        <thead>
          <tr>
            <th>
              Id
            </th>
            <th>
              Personaje
            </th>
            <th>
              Anime
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((elemento)=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.personaje}</td>
              <td>{elemento.anime}</td>
              <td>
                <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
                {"  "}
                <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
      
      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>
              Insertar Registro
            </h3>
          </div>
        </ModalHeader>
        
        <ModalBody>
          <FormGroup>
            <label>
              Id:
            </label>
            <input 
              className='form-control' 
              readOnly value={this.state.data.length+1}
              type='text'
            />
          </FormGroup>
          <FormGroup>
            <label>
              Personaje:
            </label>
            <input 
              className='form-control' 
              name='personaje' 
              type='text'
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>
              Anime:
            </label>
            <input 
              className='form-control' 
              name='anime' 
              type='text'
              onChange={this.handleChange}
            />
          </FormGroup>
        </ModalBody>
      
        <ModalFooter>
          <Button color="primary" onClick={()=>this.insertar()}>Crear</Button>
          {/* onClick={()=>this.insertar()} */}
          <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
          {/* onClick={()=>this.ocultarModalInsertar()} */}
        </ModalFooter>

        
      </Modal>
      
      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
          <div>
            <h3>
              Editar Registro
            </h3>
          </div>
        </ModalHeader>
        
        <ModalBody>
          <FormGroup>
            <label>
              Id:
            </label>
            <input 
              className='form-control' 
              readOnly value={this.state.form.id}
              type='text'
            />
          </FormGroup>
          <FormGroup>
            <label>
              Personaje:
            </label>
            <input 
              className='form-control' 
              name='personaje' 
              type='text'
              value={this.state.form.personaje}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>
              Anime:
            </label>
            <input 
              className='form-control' 
              name='anime' 
              type='text'
              value={this.state.form.anime}
              onChange={this.handleChange}
            />
          </FormGroup>
        </ModalBody>
      
        <ModalFooter>
          <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
          {/* onClick={()=>this.insertar()} */}
          <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          {/* onClick={()=>this.ocultarModalInsertar()} */}
        </ModalFooter>

        
      </Modal>

      </>
    )
  }
}

export default App;
