// import React from "react";
// import { gql, useQuery } from "@apollo/client";
// import Grid from "@mui/material/Unstable_Grid2"; // Import Grid2
// import { Typography } from "@mui/material";

// const GET_HEROES = gql`
//   query GetHeroes {
//     heroes {
//       id
//       name
//       power
//     }
//   }
// `;

// const HomePage = () => {
//   const { loading, error, data } = useQuery(GET_HEROES);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <Grid container spacing={2}>
//       <Grid xs={12} component={Typography} variant="h2">
//         Game Heroes
//       </Grid>
//       {data.heroes.map(hero => (
//         <Grid xs={12} key={hero.id} component="div">
//           <Grid component={Typography} variant="h6">
//             {hero.name}
//           </Grid>
//           <Grid component={Typography}>
//             Power: {hero.power}
//           </Grid>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default HomePage;