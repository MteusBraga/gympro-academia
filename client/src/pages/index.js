import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3333/listaUsuarios');
        
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao obter os usuários:', error);
        
      }
    };

    getUsuarios(); 
  }, []); 

  console.log(usuarios)
  return (
    <main>
      <h1>Usuarios: </h1>
      {usuarios.map(items => {
        return(
          <div className='bg'>
            <h1>{items.id}</h1>
            <p>{items.nome}</p>
          </div>
        )
      })}
    </main>
  );
}
