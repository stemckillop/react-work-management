import React, { Component } from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
import withData from '../withDataFetching'

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

//const Board = ({ lanes, loading, error, data }) => (
  class Board extends React.Component {

    constructor() {
      super()
      this.state = {
        tickets: []
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) {
        this.setState({ tickets: this.props.data })
      }
    }

    onDragStart = ( e, id ) => {
      e.dataTransfer.setData('id', id)
    }

    onDragOver = e => {
      e.preventDefault();
    }

    onDrop = (e, laneId) => {
      const id = e.dataTransfer.getData('id');
  
      const tickets = this.state.tickets.filter(ticket => {
        if (ticket.id === parseInt(id)) {
          ticket.lane = laneId;
        }
        return ticket;
      });    
  
      this.setState({
        ...this.state,
        tickets,
      });
    };

    render() {
      const { lanes, loading, error } = this.props

    return ( 
      <BoardWrapper>
        {lanes.map(lane => 
          <Lane
            key={lane.id}
            title={lane.title}
            laneId={lane.id}
            loading={loading}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            error={error}
            tickets={this.state.tickets.filter(ticket => ticket.lane === lane.id)}
          />)}
      </BoardWrapper>
      )
    }
}

export default withData(Board)