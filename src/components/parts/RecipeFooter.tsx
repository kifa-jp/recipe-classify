import { Box } from '@chakra-ui/react';
import React from 'react';

function RecipeFooter() {
  return (
    <Box
      position="absolute"
      bottom="0"
      left="50%"
      transform="auto"
      translateX="-50%"
      color="gray.600"
      fontSize="xx-small"
    >
      {/* <!-- Rakuten Web Services Attribution Snippet FROM HERE --> */}
      <a href="https://developers.rakuten.com/" target="_blank" rel="noreferrer">
        Supported by Rakuten Developers
      </a>
      {/* <!-- Rakuten Web Services Attribution Snippet TO HERE --> */}
    </Box>
  );
}

export default RecipeFooter;
