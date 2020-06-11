import React from 'react';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { JobPost } from './JobPost';

import styled from 'styled-components';

const SearchBox = styled.div`
  padding: 5vh 0;
`

export const SearchJob = () => {

  return (
    <SearchBox>
      <InputGroup>
        <FormControl
          placeholder="Job Key words"
          aria-label="Job Key words"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Search</Button>
        </InputGroup.Append>
      </InputGroup>
      <hr />
      <div>
        <JobPost />
        <JobPost />
        <JobPost />
        <JobPost />
        <JobPost />
      </div>
    </SearchBox>


  )
}