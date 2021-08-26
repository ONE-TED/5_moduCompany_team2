import React from 'react';
import styled from 'styled-components';

import TodoTemplate from 'Components/TodoTemplate';
import TodoSection from 'Components/TodoSection';

const Home: React.FC = () => {
  return (
    <TodoTemplate>
      <TodoSection />
    </TodoTemplate>
  );
};
export default Home;
