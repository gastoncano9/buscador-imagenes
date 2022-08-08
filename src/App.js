import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import './estilos/Header.css';
import './estilos/Contenedor.css';

//Al formik le pasamos un objeto los valores iniciales que queremos que tenga nuestros campos
//tambien le pasamos la funcion de onsubmit y una funcion a onsubmit
//los valores los contiene formik

/*
IMPORTANTE cada vez que guardemos algo o querramos usar algo podemos
usar el usestate paraa guardar arrays onjetos lo que sea
-------------------------------------------------------

tambien cuando uso un map puedo devolver una etiqueta
*/

function App() {

  //la funcion set cuando reciba informacion se la va pasar
  //automaticamente a las fotos
  const [fotos, setFotos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const open = (url) =>
  {
    window.open(url);
  }

  return (
    <div>
      <header>
        <Formik
          initialValues={{buscar:''}}
          onSubmit={async values =>
          {
            const respuesta = await fetch(`https://api.unsplash.com/search/photos?per_page=20
            &query=${values.buscar}`,
            {
              headers:
              {
                'Authorization': 'Client-ID yGw9qTvS2G8eD3w-WSl-kQCED7JemVnmsTZ1lRphvOM'
              }
            });
            
            const data = await respuesta.json();
            
            if(data.results.length > 0)
            {
              setBusqueda(`${values.buscar}`);
              setFotos(data.results);
            }
            else
            {
              setBusqueda(`${values.buscar}`);
              setFotos(data.results);
            }
          }}
        >

          <Form>
            <Field name = "buscar"/>
          </Form>

        </Formik>
      </header>
      
      {fotos.length !== 0?
      
      <div className='contenedor-imagenes'>
          <div className='centrar'>
            {fotos.map(foto =>
              <div className ='imagen' key = {foto.id} onClick = {() => open(foto.links.html)}>
                <div className='img'>
                  <img src = {foto.urls.regular} alt = {foto.id}/>
                </div>
                <div className='parrafo'>
                  <p>{[foto.description, foto.alt_description].join(' - ')}</p>
                </div>
              </div>
            )}
          </div>
      </div>
    
      :<h2>{busqueda !== ''? `No se encontraron coincidencias para: '${busqueda}'`:
        'Buscar'
      }</h2>}
      
    </div>
  );
}

export default App;
