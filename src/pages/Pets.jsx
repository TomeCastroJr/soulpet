import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deletePet, getPets } from "../api/pet";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { getClientes } from "../api/clientes";

function Pets() {
  const [pets, setPets] = useState(null);
  const [cliente, setCliente] = useState(null);

  const navigate = useNavigate();

  function carregarCliente(){
    getClientes().then( (dados) => {
      setCliente(dados);
    })
  }

  function carregarPets(){
    getPets().then( (dados) => {
      setPets(dados)
    })
  }

  function deletarPets(id){
    const pet = confirm("Tem certeza que deseja excluir o pet?");

    if(pet){
      deletePet(id).then( (resposta) => {
        toast.success(resposta.message);
        carregarPets();
      })
    }
  }

  useEffect( () => {
    carregarCliente();
    carregarPets();
    
  },[])

  return (
    <main className="mt-4 container">
      <h1>Pets</h1>
      <Button as={Link} to="/pets/novo">
        Adicionar Pet
      </Button>
      <hr />
      {
        pets ?
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Porte</th>
              <th>Tipo</th>
              <th>Data Nascimento</th>
              <th>Nome Dono</th>
              <th>Ações</th>
            </tr>
            {
              pets.map( (pet) => {
                const clienten = cliente.find((cliente) => cliente.id === pet.clienteId);
                return (
                  <tr key={pet.id}>
                    <td>{ pet.nome }</td>
                    <td>{ pet.porte }</td>
                    <td>{ pet.tipo }</td>
                    <td>{ pet.dataNasc ? new Date(pet.dataNasc+"T00:00:00").toLocaleDateString() : "-" }</td>
                    <td>{clienten.id === pet.clienteId ? clienten.nome: " sem dono"}</td>
                    <td>
                      <Button size="sm" variant="danger" as={Link} className="mx-2" onClick={()=> deletarPets(pet.id)}>Excluir</Button>
                      <Button size="sm" as={Link} to={`/pets/editar/${pet.id}`}>
                        Editar
                      </Button>
                    </td>
                  </tr>
                )
              })
            }
          </thead>
        </Table> : 
        <Loader />
      }
    </main>
  );
}

export default Pets;
