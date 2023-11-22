import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

export default class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'Normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCard: [],
  };

  saveButton = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;
    const maxAttrSum = 210;
    const minAttr = 0;
    const maxAttr = 90;
    const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const attr1Card = minAttr <= Number(cardAttr1) && Number(cardAttr1) <= maxAttr;
    const attr2Card = minAttr <= Number(cardAttr2) && Number(cardAttr2) <= maxAttr;
    const attr3Card = minAttr <= Number(cardAttr3) && Number(cardAttr3) <= maxAttr;
    if (!cardName || !cardDescription || !cardImage || !cardRare
      || !attr1Card || !attr2Card || !attr3Card || sum > maxAttrSum) {
      this.setState((prevState) => ({
        ...prevState,
        isSaveButtonDisabled: true,
      }));
      return;
    }
    this.setState({
      isSaveButtonDisabled: false,
    });
  };

  handleChange = ({ target: { name, value, checked, type } }) => {
    const validValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: validValue }, () => this.saveButton());
  };

  onSaveButtonClick = (event) => {
    console.log('click');
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
    } = this.state;
    if (cardTrunfo === true) {
      this.setState({ hasTrunfo: true });
    }
    const newCard = {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    };
    this.setState((prev) => ({
      savedCard: [...prev.savedCard, newCard],
    }), () => {
      this.setState({
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardRare: 'Normal',
        cardTrunfo: false,
        disabled: true,
      });
    });
  };

  cardRemoveButton = (cardName) => {
    console.log(cardName);
    this.setState((prevState) => ({
      savedCard: prevState.savedCard.filter((card) => card.cardName !== cardName),
    }));
  };

  nameFilter = (event) => {
    const { target: { value } } = event;
    this.setState((prevState) => ({
      savedCard: prevState.savedCard.filter((card) => card.cardName.includes(value)),
    }));
  };

  rarityFilter = (event) => {
    const { target: { value } } = event;
    if (value === 'todas') {
      return;
    }
    this.setState((prevState) => ({
      savedCard: prevState.savedCard.filter((card) => card.cardRare === value),
    }));
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      savedCard,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <label>
          Filtrar pelo nome da carta:
          <input
            data-testid="name-filter"
            name="nameFilter"
            type="text"
            onChange={ this.nameFilter }
          />
        </label>
        <label>
          Filtrar pela raridade da carta:
          <select
            data-testid="rare-filter"
            name="rarityFilter"
            type="text"
            onChange={ this.rarityFilter }
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.handleChange }
        />
        {savedCard.map((card) => (
          <div key={ card.cardName }>
            <Card
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardAttr1={ card.cardAttr1 }
              cardAttr2={ card.cardAttr2 }
              cardAttr3={ card.cardAttr3 }
              cardImage={ card.cardImage }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
            />
            <button
              data-testid="delete-button"
              onClick={ () => this.cardRemoveButton(card.cardName) }
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    );
  }
}
