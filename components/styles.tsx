import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin: 15px 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 25px;
`;

export const Button = styled.button`
  height: 30px;
  font-weight: 500;
  cursor: pointer;
`;

export const TableContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Table = styled.table`
  width: 100%;
  text-align: center;
`;

export const TableHeader = styled.th`
  padding: 10px;
  background-color: #fff;
  border-bottom: 2px solid #000000;
`;

export const TableCell = styled.td`
  padding: 10px;
  background-color: #fff;
  border-bottom: 2px solid #000000;
  border-right: 2px solid #000000;
  border-left: 2px solid #000000;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
`;

export const ActionIcon = styled.div`
  cursor: pointer;
  margin: 0 5px;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Header = styled.div`
  background: linear-gradient(#7c7c7c, #fafafa);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  margin-bottom: 15px;
`;

export const SubTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
`;