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
      txtcolor: [],
      subheader: 'Список ваших дел (пуст)'
    }
  }

  onChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  addItem = () => {
    const { inputValue, nextId } = this.state
    const newItem = { text: inputValue, id: nextId }

    if (!inputValue)
    {
      alert("Введите текст");
      return;
    }

    this.setState(state => ({
      items: [...state.items, newItem],
      txtcolor: [...state.txtcolor, "blue"],
      nextId: state.nextId + 1,
      inputValue: '',
      item_count: state.item_count + 1,
      subheader: 'Список ваших дел (' + (state.item_count + 1) + ')'
    }))
  }

  removeItem = (id) => {
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id),
      txtcolor: state.txtcolor.filter(item => item.id !== id),
      item_count: state.item_count - 1,
      subheader: 'Список ваших дел (' + (state.item_count - 1) + ')'
    }))

    if (this.state.item_count === 1) {
      this.setState(state => ({subheader: 'Список ваших дел (пуст)'}))
    }
  }

  setNegative = (id) => {
    let cols=this.state.txtcolor.slice();
    cols[id] = "red";
    this.setState(state => ({txtcolor: cols}));
  }

  setPositive = (id) => {
    let cols=this.state.txtcolor.slice();
    cols[id] = "green";
    this.setState(state => ({txtcolor: cols}));
  }

  render() {
    const { inputValue, items, txtcolor } = this.state;

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
              txtcolor={txtcolor[item.id]}
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

const Item = ({ text, txtcolor, handleDelete, setNegative, setPositive }) => (
  <div className={s.item}>
    <img src="todo-negative.png" title="Провалено" onClick={setNegative}></img>
    <div className={s.text}>
      <font color={txtcolor}>{text}</font>
    </div>
    <img src="todo-positive.png" title="Выполнено" onClick={setPositive}></img>
    <button className={s.button} onClick={handleDelete}>
      Удалить
    </button>
  </div>
)

export default Items