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
      txtstyle: [],
      subheader: 'Список ваших дел (пуст)'
    }
  }

  onChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  addItem = () => {
    const { inputValue, nextId } = this.state
    const newItem = { text: inputValue, id: nextId }
    const newStyle = { style: s.text, id: nextId }

    if (!inputValue) {
      alert("Введите текст");
      return;
    }

    this.setState(state => ({
      items: [...state.items, newItem],
      txtstyle: [...state.txtstyle, newStyle],
      nextId: state.nextId + 1,
      inputValue: '',
      item_count: state.item_count + 1,
      subheader: 'Список ваших дел (' + (state.item_count + 1) + ')'
    }))
  }

  removeItem = (id) => {
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id),
      txtstyle: state.txtstyle.filter(item => item.id !== id),
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
    let st = this.state.txtstyle.slice();
    st.find(item => item.id === id).style = s.text_negative;
    this.setState(state => ({txtstyle: st}));
  }

  setPositive = (id) => {
    let st = this.state.txtstyle.slice();
    st.find(item => item.id === id).style = s.text_positive;
    this.setState(state => ({txtstyle: st}));
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
              txtstyle={this.state.txtstyle.find(el => el.id === item.id).style}
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

const Item = ({ text, txtstyle, handleDelete, setNegative, setPositive }) => (
  <div className={s.item}>
    <img className={s.ico_negative} src="todo-negative.png" title="Провалено" onClick={setNegative}></img>
    <div className={txtstyle}>
      {text}
    </div>
    <img className={s.ico_positive} src="todo-positive.png" title="Выполнено" onClick={setPositive}></img>
    <button className={s.button} onClick={handleDelete}>
      Удалить
    </button>
  </div>
)

export default Items