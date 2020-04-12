import React from 'react';
import Ticket from '../Ticket/Ticket'
import styled from 'styled-components';

const LaneWrapper = styled.div`
  list-style: none;
  text-align: left;
  padding: 0;
  background: lightGray;
  border-radius: 20px;
  min-height: 50vh;
  width: 20vw;

  @media (max-width: 768px) {
    margin-bottom: 5%;
  }
`;

const Title = styled.h2`
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid darkGray;
`;

const TicketsWrapper = styled.div`
  padding: 5%;
`

const Alert = styled.div`
  text-align: center;
`

const Lane = ({ laneId, tickets, loading, error, onDragOver, onDragStart, onDrop, title }) => (
  <LaneWrapper onDragOver={onDragOver} onDrop={e => onDrop(e, laneId)}>
    <Title>{title}</Title>
    {(loading || error) && <Alert>{loading ? 'Loading...' : 
       error}</Alert>}
     <TicketsWrapper>
       {tickets.map(ticket => <Ticket key={ticket.id} 
        onDragStart={onDragStart} ticket={ticket} />)}
     </TicketsWrapper>
  </LaneWrapper>
);

export default Lane;
