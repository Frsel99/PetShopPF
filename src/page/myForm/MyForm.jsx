import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTotalPets, deleteThisPet} from "../../redux/actions";
// import Pet from "../pet/Pet";
import { Loader } from "../../page/loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { AsidePets } from "../../components/aside/Aside Pets";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";




const MainAllCards = styled.div`
  box-sizing: border-box;
  display: grid;
  place-content: left;
  grid-template-columns: repeat(auto-fit, minmax(21em, 21em));
  margin: 2px;
  justify-content: center;
  min-height: 68vh;
  margin-right: 10em;
  margin-bottom: 5em;
`;

const Error = styled.h1`
    width: 30%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 1.5em;
    line-height: 22px;
    position: absolute;
    right: 32%;
    top: 16%;
`

const CatSleeping = styled.img`
    position: absolute;
    top: 15%;
    left: 40%;
`

const NombreSpan = styled.span`
display: inline-block;
&::after {
    content: '';
    width: 0px;
    height: 1px;
    display: block;
    background: black;
    transition: color 0.2s ease;
    transition: width 0.3s;
  }
`

const ContainerPets = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 16px;
  width: 288px;
  height: 520px;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0px 32px;
  margin-bottom: 4em;
  &:hover {
    padding: 15px;
    cursor: pointer;
    border: 2px solid #0acf83;
  }
  &:hover ${NombreSpan} {
     transition: color 0.2s ease;
     color: #0acf83;
    &::after {
        background: #0acf83;
        width: 100%;
    }
 }
`;

const Image = styled.img`
  object-fit: cover;
  width: 250px;
  height: 230px;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
  position: relative;
`;

const State = styled.h4`
  position: static;
  left: 20%;
  right: 20%;
  top: 0%;
  bottom: 0%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #0acf83;
  background: #f4f8ec;
  border-radius: 10px;
  margin: 2px;
`;

const Category = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #151515;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 2px;
`;

const Sexo = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #eb8d70;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 2px;
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 2px;
  margin-top: 8px;
`;

const Description = styled.p`
  overflow: hidden;
  max-height: 120px;
  max-width: 216px;
  margin-top: 4px;
  top: 11px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  position: static;
  margin-bottom: 6px;
  margin-top: 9px;
  line-height: 20px;
  color: #151515;
`;

const Nombre = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #575757;
  margin: 2px;  
`;

const Ubicacion = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #eb8d70;
`;


const MyForm = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const user = useSelector((state) => state.clientReducer.user);
    const allPets = useSelector((state) => state.clientReducer.pets);
    // console.log('pets', allPets)
    const [loader, setLoader] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(false);
    const [myPets, setMyPets] = useState([])
    // const userId =   'syOSZUVKvxO6hYb623Bna8LE2f82"'
    

    // const navigatePet = (e) => {
    //     navigate(`/pets/${e.currentTarget.id}`);
    // };
     
    function handleDelete (uid) {
        dispatch(deleteThisPet(uid))

    }

    useEffect(() => {
        setMyPets(allPets.filter(e => e.data.userId === user.uid))
      }, [user])
    
    useEffect(() => {
        console.log('esto es user', user)
        console.log('esto es allPets', allPets)
        console.log('esto es myPets', myPets)
    },[user, allPets, myPets])

    useEffect(() => {
        // dispatch(getSpeciesPets())
        dispatch(getTotalPets())
            .then((response) => {
                setLoader(false);
            })
            .catch((error) => setError(error.message));
    }, [dispatch]);

    if (loader) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {/* <AsidePets /> */}
            <Navbar/>
            <MainAllCards>
                {myPets.length ? (
                    myPets.map((e) => {
                        return (
                            <div key={e.uid} id={e.uid}>
                                {console.log('esto es e', e)}
                                {/* <Pet
                                    state={e.data.state}
                                    category={e.data.category}
                                    sexo={e.data.sexo}
                                    name={e.data.name}
                                    description={e.data.description}
                                    photos={e.data.photos}
                                /> */}
                                <ContainerPets>
                                    <div>
                                    <button onChange={() => handleDelete(e.uid)}>X</button>
                                    </div>
            <div>
                <Image src={e.data.photos} alt="Photo not found" />
            </div>
            <TagContainer>
                <div>
                    <State>{e.data.state === "encontrado" ? "Encontrado" : e.data.state === "perdido" ? "Perdido" : e.data.state === "en adopcion" ? "En Adopcion" : e.data.state}</State>
                </div>
                <div>
                    <Category>{e.data.category === 'gato' ? "Gato" : e.data.category === 'perro' ? "Perro" : e.data.category}</Category>
                </div>
                <div>
                    <Sexo>{e.data.sexo === 'male' ? "Macho" : "Hembra"}</Sexo>
                </div>
            </TagContainer>
            <div>
                <Nombre>Me llamo: <NombreSpan>{e.data.name} </NombreSpan> </Nombre>
            </div>
            <div>
                <Description>{e.data.description}</Description>
            </div>
            <div>
                <Ubicacion>Aqui va la ubicacion </Ubicacion>
            </div>
        </ContainerPets>
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <Error>Vaya! Parece que no hemos encontrado ninguna mascota con dichas caracteristicas</Error>
                        <CatSleeping src='https://31.media.tumblr.com/e9c5a6eb1241c1cd3f89e12e89874c66/tumblr_mv1vm39xs51rz5dlbo1_500.gif' alt='' />
                    </div>
                )}
                <div>
                    <Link to='/'>
                    <button>Volver al home</button>
                    </Link>
                </div>
            </MainAllCards>
            <Footer />
        </div>
    );
};

export default MyForm;