import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { signupUser } from '../services/authentication';

const SignupCard = styled(Card)`
  margin-top: 10vh;
`;

const EachInput = styled(Form.Group)`
  width: 50%;
  float: left;
  padding: 0 2%;
`

const Candidate = ({ jobProfile, setJobProfile }) => {
  return (
    <EachInput style={{ width: '100%' }}>
      <Form.Label>Job Profile</Form.Label>
      <Form.Control type="text" placeholder="Enter your job profile" value={jobProfile} onChange={(e) => setJobProfile(e.target.value)} />
    </EachInput>
  )
}

const Recruiter = ({ company, setCompany, industry, setIndustry, website, setWebsite }) => {
  return (
    <>
      <EachInput style={{ width: '100%' }}>
        <Form.Label>Company</Form.Label>
        <Form.Control type="text" placeholder="Enter your company" value={company} onChange={(e) => setCompany(e.target.value)} />
      </EachInput>
      <EachInput>
        <Form.Label>Industry</Form.Label>
        <Form.Control type="text" placeholder="Enter your industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
      </EachInput>
      <EachInput>
        <Form.Label>Website</Form.Label>
        <Form.Control type="text" placeholder="Enter your website" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </EachInput>
    </>
  )
}

export const SignupBox = () => {
  const [firstName, setFirstName] = useState('Nitin');
  const [lastName, setLastName] = useState('Pant');
  const [gender, setGender] = useState('male');
  const [type, setType] = useState('recruiter');
  const [email, setEmail] = useState('nitin@gmail.com');
  const [password, setPassword] = useState('test@123');
  const [jobProfile, setJobProfile] = useState('developer');
  const [company, setCompany] = useState('Pesto');
  const [industry, setIndustry] = useState('education');
  const [website, setWebsite] = useState('pesto.com');

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('sdsdsddsdsds')
    console.log(firstName, lastName, gender, type, email, password);
    console.log(company, industry, website);
    console.log(jobProfile);
    const response = await signupUser({
      firstName, 
      lastName, 
      email, 
      password,
      gender, 
      type,
      company,
      industry,
      website,
      jobProfile
    })
    console.log(response);
    
  }


  return (
    <SignupCard>
      <Card.Body>
        <h5>Signup on the portal</h5>
        <hr />
        <Form>
          <EachInput>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </EachInput>
          <EachInput>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </EachInput>
          <EachInput>
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </EachInput>
          <EachInput>
            <Form.Label>You are </Form.Label>
            <Form.Control as="select" onChange={(e) => setType(e.target.value)}>
              <option value="recruiter">Recruiter</option>
              <option value="candidate">Candidate</option>
            </Form.Control>
          </EachInput>
          <EachInput>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
          </EachInput>
          <EachInput>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </EachInput>
          {type === 'recruiter' ? <Recruiter company={company} setCompany={setCompany} industry={industry} setIndustry={setIndustry} website={website} setWebsite={setWebsite} /> : <Candidate jobProfile={jobProfile} setJobProfile={setJobProfile} />}
          <Button variant="primary" onClick={handleSignup}>
            Signup
          </Button>
        </Form>
      </Card.Body>
    </SignupCard>
  )
}