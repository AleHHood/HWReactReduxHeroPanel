import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';

import { heroesAdd, heroesAddError } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();


    return (
        <Formik
          initialValues={{ name: '', text: '', element: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(10, 'Must be 10 characters or less')
              .required('Required'),
            text: Yup.string()
              .max(50, 'Must be 50 characters or less')
              .required('Required'),
            element: Yup.string()
            .required('Required'),
          })}
            onSubmit={(values) => {
                const hero = {id: uuidv4(), ...values}
                request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(hero))
                .then(() => dispatch(heroesAdd(hero)))
                .catch(() => dispatch(heroesAddError()))
                console.log(hero);
                
            }
                
            }
        >
          <Form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <Field 
                    name="name" 
                    type="text" 
                    placeholder="Как меня зовут?" 
                    className="form-control"
                />
                <ErrorMessage name="name" />
            </div>
    
            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <Field 
                    name="text" 
                    type="textarea"
                    component="textarea"
                    className="form-control"  
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                />
                <ErrorMessage name="text" />
            </div>
            
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <Field
                    name="element" 
                    type="select" 
                    component="select"
                    className="form-select" 
                >
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </Field>
                <ErrorMessage name="element" />
            </div>
    
            <button type="submit" className="btn btn-primary">Создать</button>
          </Form>
        </Formik>
      );
    }

export default HeroesAddForm;

/*             <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary" onClick={addHero()}>Создать</button>
        </form> */
