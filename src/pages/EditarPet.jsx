import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getPet, updatePet } from "../api/pet";


function EditarPet() {
  const { register, handleSubmit, formState: { errors }, reset  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  function carregarPets(){
    getPet(id).then( (dados) => {
      reset(dados)
    }).catch( (err) => {
      navigate("/pets")
    })
  }
  
  function salvarPet(dados){
    if(dados.dataNasc === "") dados.data = null;

    updatePet(id, dados).then( (resposta) => {
      toast.success("Pet Atualizado")
      navigate("/pets")
    }).catch( (err) => {
      toast.error(err.response.data.message)
    })
  }

  useEffect( ()=>{
    carregarPets();
  },[])

  return (
    <main className="mt-4 container">
      <h1>Editar pet</h1>
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
            {...register("dataNasc", { required: true })}
          />
          {errors.dataNasc && (
            <smal className="text-danger">Data obrigatória</smal>
          )}
        </div>

        <Button className="mt-3" type="submit">
          Cadastrar Pet
        </Button>
      </form>
    </main>
  );
}

export default EditarPet;
