import React, {useEffect, useState} from 'react';
import './App.css';
import {Typography, Select, Row, Col, Button, Form} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import {Input} from "antd/es";

const { Title } = Typography;
const { Option } = Select;

const App = () => {


  const [ joke, setJoke ] = useState('');
  const [ categories, setCategories ] = useState( []);
  const [ currentCategory, setCurrentCategory ] = useState('');
  const [ jokesResults, setJokesResults ] = useState( [] );
  useEffect( () => {

    getRandomJoke();

      const getCategories = async ()=> {
          const categoriesResponse = await fetch('https://api.chucknorris.io/jokes/categories')
          const categoriesJson = await categoriesResponse.json();

          setCategories( categoriesJson );

      };
      getCategories();
  }, [] );

    const getRandomJoke = async ()=> {
        if(currentCategory === ''){
            const jokeResponse = await fetch('https://api.chucknorris.io/jokes/random')
            const jokeJson = await jokeResponse.json();
            setJoke( jokeJson.value );
        }else{
            const jokeResponse = await fetch('https://api.chucknorris.io/jokes/random?category=' + currentCategory)
            const jokeJson = await jokeResponse.json();
            setJoke( jokeJson.value );
        }
    };

  const handleChange = ( category ) => setCurrentCategory( category);

  const handleSearchJoke = async ({text} ) => {
      const jokeResponse = await fetch('https://api.chucknorris.io/jokes/search?query=' + text)
      const jokeJson = await jokeResponse.json();
      console.log('jokeJson', jokeJson);
      setJokesResults( jokeJson.result );
  }

  return (
    <div>
        <Row justify='center'>
            <Col>
                <Title>Chuck Norris Jokes</Title>
            </Col>
        </Row>

      <Row justify='center'>
          <Col>
              <Select defaultValue='' style={{ width: 200 }} onChange={handleChange}>
                  <Option value=''>Cualquier Categoria</Option>
                  {categories.map((category) =><Option value={category} key={category}>{category}</Option>)}
              </Select>
          </Col>
      </Row>
      <Row justify='center'>
          <Col>

              <Button type='primary' onClick={getRandomJoke} icon={<SearchOutlined />}>
                  Otra Broma
              </Button>
          </Col>
      </Row>
        <Row justify= 'center'>
            <Col>
                { joke }
            </Col>
        </Row>


        <Row justify= 'center'>
            <Col>
                <Form name='joke' onFinish={handleSearchJoke}>
                    <Form.Item className='Item' name='text' rules={[
                        {
                          required: true
                        }
                    ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType='submit'>Buscar</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>

        <Row justify='center'>
            <Col>
                <ul>
                    {jokesResults.map ( ( joke, i) => <li key={ i }>{ joke.value}</li> )}
                </ul>
            </Col>
        </Row>

    </div>
  );
}

export default App;
