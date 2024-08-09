import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addPet } from "../api/pet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClientes } from "../api/clientes";


function NovoPet() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const [clientes, setClientes] = useState([])

    const navigate = useNavigate();

    function salvarPet(data){
      if(data.dataNasc === "") data.dataNasc = null;

      addPet(data).then( (resposta) => {
        toast.success("Pet inserido com sucesso.")
        navigate("/pets")
      }).catch( (err) => {
        console.log(err)
      })
    }

    function carregarClientes(){
      getClientes().then( (dados) => {
        setClientes(dados)
      })
    }

    useEffect( () => {
      carregarClientes();
    },[])
    
  return (
    <main className="mt-4 container">
      <h1>Novo pet</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarPet)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input 
            type="text" 
            id="nome" 
            className="form-control"
            {...register("nome", { required:true, maxLenght: 200 }) }
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>

        <div>
          <label htmlFor="porte">Porte</label>
          <input 
            type="text" 
            id="porte"
            className="form-control"
            {...register("porte", { required: true })}
          />
          {errors.porte && (
            <smal className="text-danger">O porte é obrigatório</smal>
          )}
        </div>

        <div>
          <label htmlFor="tipo">Tipo</label>
          <input 
            type="text" 
            id="tipo"
            className="form-control"
            {...register("tipo", { required: true })}
          />
          {errors.tipo && (
            <smal className="text-danger">O tipo é obrigatório</smal>
          )}
        </div>

        <div>
          <label htmlFor="dataNasc">DataNascimeto</label>
          <input 
            type="date" 
            id="dataNasc"
            className="form-control"
            {...register("dataNasc")}
          />
          {errors.dataNasc && (
            <smal className="text-danger">Data obrigatória</smal>
          )}
        </div>

        <div>
          <label htmlFor="clienteId">Cliente</label>
          <select
            id="clienteId"
            className="form-select"
            {...register("clienteId", { required: true, valueAsNumber: true })}
          >
            <option value="">Selecione Cliente</option>
            { clientes.map( (cliente) => {
              return (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome} - {cliente.email}
                </option>
              )
            }) }
          </select>
          {errors.clienteId && (
            <small className="text-danger">Insira o nome do cliente.</small>
          )}
        </div>
        
        <Button className="mt-3" type="submit">
          Cadastrar Pet
        </Button>
      </form>
    </main>
  );
}

export default NovoPet;
