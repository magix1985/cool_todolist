import React, { PureComponent } from 'react';
import s from './Items.module.css'

class Items extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      items: [],
      nextId: 0,
      item_count: 0,
      subheader: 'Список ваших дел (пуст)'
    }
  
    this.textChange = this.textChange.bind(this);
  }

  onChange = (ev) => {
    this.setState({ inputValue: ev.target.value })
  }

  addItem = () => {
    const { inputValue, nextId } = this.state
    const newItem = { text: inputValue, id: nextId, status: 0, active: false }

    if (!inputValue) {
      alert("Введите текст");
      return;
    }

    this.setState(state => ({
      items: [...state.items, newItem],
      nextId: state.nextId + 1,
      inputValue: '',
      item_count: state.item_count + 1,
    }), () => this.updateSubHeader())
  }

  removeItem = (id) => {
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id),
      item_count: state.item_count - 1,
    }), () => this.updateSubHeader())
  }

  updateSubHeader = () => {
    if (this.state.item_count === 0) {
      this.setState(state => ({subheader: 'Список ваших дел (пуст)'}))
    }
    else {
      this.setState(state => ({subheader: `Список ваших дел (${this.state.item_count})`}))
    }
  }

  setNegative = (id) => {
    this.setState(state => ({
      items: state.items.map(u =>
        (u.id === id ? Object.assign(u, {status: 1}) : Object.assign({}, u))
      )
    }));
  }

  setPositive = (id) => {
    this.setState(state => ({
      items: state.items.map(u =>
        (u.id === id ? Object.assign(u, {status: 2}) : Object.assign({}, u))
      )
    }));
  }

  activateEditMode = (id) => {
    this.setState(state => ({
      items: state.items.map(u =>
        (u.id === id ? Object.assign(u, {active: true}) : Object.assign({}, u))
      )
    }));
  }

  deactivateEditMode = (id) => {
    this.setState(state => ({
      items: state.items.map(u =>
        (u.id === id ? Object.assign(u, {active: false, text: u.text}) : Object.assign({}, u))
      )
    }));
  }

  textChange = (ev, id) => {
    const value = ev.target.value;

    if (!value) {
      alert("Текст не должен быть пустым");
      return;
    }

    this.setState(state => ({
      items: state.items.map(u =>
        (u.id === id ? Object.assign(u, {text: value, status: 0}) : Object.assign({}, u))
      )
    }));
  }

  render() {
    const { inputValue, items } = this.state;

    return (
      <div className={s.main}>
        <div className={s.container}>
          <div className={s.input}>
            <input
              className={s.inp1}
              placeholder={'Дело № ' + (this.state.item_count + 1)}
              value={inputValue}
              onChange={this.onChange}
            />
            <button onClick={this.addItem} className={s.button}>Добавить</button>
          </div>
          <br />
          {this.state.subheader}
          {
            items.map((item) => <Item
              key={item.id}
              text={item.text}
              status={item.status}
              editMode={item.active}
              handleDelete={ () => { this.removeItem(item.id) }}
              setNegative={ () => { this.setNegative(item.id) }}
              setPositive={ () => { this.setPositive(item.id) }}
              activateEditMode={ () => { this.activateEditMode(item.id) }}
              deactivateEditMode={ () => { this.deactivateEditMode(item.id) }}
              textChange={ (ev) => { this.textChange(ev, item.id) } }
            />)
          }
        </div>
      </div>
    )
  }
}

const Item = ({ text, status, editMode, handleDelete, setNegative, setPositive, activateEditMode, deactivateEditMode, textChange }) => (
  <div className={s.item}>
    <img className={s.ico_negative} src="todo-negative.png" title="Провалено" onClick={setNegative}></img>
      {editMode === false ? (
        <div className={(status === 0) ? s.text_new : (status === 1) ? s.text_neg : s.text_pos}>
          <span onClick={activateEditMode}>{text}</span>
        </div>
      ) : (
        <div className={s.text_edit}>
          <input onChange={textChange} className={s.text_edit} autoFocus={true} onBlur={deactivateEditMode} value={text}></input>
        </div>
      )
    }
    <img className={s.ico_positive} src="todo-positive.png" title="Выполнено" onClick={setPositive}></img>
    <button className={s.button} onClick={handleDelete}>
      Удалить
    </button>
  </div>
)

export default Items