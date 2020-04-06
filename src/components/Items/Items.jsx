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
  }

  onChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  addItem = () => {
    const { inputValue, nextId } = this.state
    const newItem = { text: inputValue, id: nextId, status: 0 }

    if (!inputValue) {
      alert("Введите текст");
      return;
    }

    this.setState(state => ({
      items: [...state.items, newItem],
      nextId: state.nextId + 1,
      inputValue: '',
      item_count: state.item_count + 1,
      subheader: 'Список ваших дел (' + (state.item_count + 1) + ')'
    }))
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
    let itemsCopy = this.state.items.map(u => Object.assign({}, u));
    itemsCopy.find(item => item.id === id).status = 1;
    this.setState(state => ({items: itemsCopy}));
  }

  setPositive = (id) => {
    let itemsCopy = this.state.items.map(u => Object.assign({}, u));
    itemsCopy.find(item => item.id === id).status = 2;
    this.setState(state => ({items: itemsCopy}));
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
              handleDelete={() => { this.removeItem(item.id) }}
              setNegative={() => { this.setNegative(item.id) }}
              setPositive={() => { this.setPositive(item.id) }}
            />)
          }
        </div>
      </div>
    )
  }
}

const Item = ({ text, status, handleDelete, setNegative, setPositive }) => (
  <div className={s.item}>
    <img className={s.ico_negative} src="todo-negative.png" title="Провалено" onClick={setNegative}></img>
    <div className={(status === 0) ? s.text_new : (status === 1) ? s.text_neg : s.text_pos}>
      {text}
    </div>
    <img className={s.ico_positive} src="todo-positive.png" title="Выполнено" onClick={setPositive}></img>
    <button className={s.button} onClick={handleDelete}>
      Удалить
    </button>
  </div>
)

export default Items