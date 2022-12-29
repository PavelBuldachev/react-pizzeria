import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();

    React.useEffect(() => {
        async function fetchFullPizza() {
            try {
                const { data } = await axios.get('https://639c192b42e3ad692726f606.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                navigate('/');
                alert('Не удалось отобразить пиццу :(')
            }
        }
        fetchFullPizza();
    }, [id, navigate]);

    if(!pizza) {
        return <>Загрузка...</>
    }

  return (
    <div className='container'>
        <div className='full-pizza'>
            <img src={pizza.imageUrl} alt=''/>
            <div className='full-pizza-content'>
                <h2>{pizza.title}</h2>
                <p>Это очень-очень вкусная пицца!</p>
                <h4>{pizza.price} руб.</h4>
                <Link to="/">
                    <button className="button button--outline button--add__back">
                        <span>Назад</span>
                    </button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default FullPizza;
