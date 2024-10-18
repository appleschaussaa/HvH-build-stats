import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid2"; // Import Grid2 from @mui/material
import {
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const GET_HEROES = gql`
    query GetHeroes {
        heroes {
            id
            name
        }
    }
`;

const GET_HERO_BY_ID = gql`
    query GetHeroById($id: ID!) {
        hero(id: $id) {
            id
            name
            level
            health
            attack
            defense
            image
            comments
        }
    }
`;

const HomePage = () => {
    const {
        loading: loadingHeroes,
        error: errorHeroes,
        data: dataHeroes,
    } = useQuery(GET_HEROES);
    const [selectedHeroId, setSelectedHeroId] = useState("");
    const {
        loading: loadingHero,
        error: errorHero,
        data: dataHero,
    } = useQuery(GET_HERO_BY_ID, {
        variables: { id: selectedHeroId },
        skip: !selectedHeroId,
    });

    const handleHeroChange = (event) => {
        setSelectedHeroId(event.target.value);
    };

    console.log("Selected Hero ID:", selectedHeroId);
    console.log("Hero Data:", dataHero);
    console.log("Heroes Data:", dataHeroes); // Log the heroes data

    const defaultHero = {
        name: "Unknown Hero",
        level: "N/A",
        health: "N/A",
        attack: "N/A",
        defense: "N/A",
        image: "default-image-url", // Provide a default image URL
        comments: [],
    };

    const hero = dataHero?.hero || defaultHero;

    const heroStats = [
        { label: "Level", value: hero.level },
        { label: "Health", value: hero.health },
        { label: "Attack", value: hero.attack },
        { label: "Defense", value: hero.defense },
        {
            label: "Comments",
            value:
                hero.comments.length > 0
                    ? hero.comments.join(", ")
                    : "No comments",
        },
    ];

    return (
        <Grid container spacing={8} sx={{ bgcolor: "gray", height: "100dvh" }}>
            <Grid size={{ xs: 12, lg: 6 }}>
                <Typography variant="h2">Game Heroes</Typography>
            </Grid>
            <Grid container size={{ xs: 12, lg: 6 }} spacing={2}>
                <Grid size={{ xs: 6, lg: 3 }}>
                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                </Grid>
                <Grid size={{ xs: 6, lg: 3 }}>
                    <Button
                        component={Link}
                        to="/dashboard"
                        variant="contained"
                        color="secondary"
                        fullWidth
                    >
                        Dashboard
                    </Button>
                </Grid>
            </Grid>
            <Grid size={{ xs: 12, lg: 3 }} offset={0.5}>
                {loadingHeroes && <Typography>Loading heroes...</Typography>}
                {errorHeroes && (
                    <Typography>Error: {errorHeroes.message}</Typography>
                )}
                {dataHeroes && dataHeroes.heroes.length > 0 ? (
                    <FormControl fullWidth>
                        <InputLabel id="hero-select-label">
                            Select Hero
                        </InputLabel>
                        <Select
                            labelId="hero-select-label"
                            value={selectedHeroId}
                            onChange={handleHeroChange}
                        >
                            {dataHeroes.heroes.map((hero) => (
                                <MenuItem key={hero.id} value={hero.id}>
                                    {hero.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <Typography>No heroes available</Typography>
                )}
            </Grid>
            {selectedHeroId && (
                <Grid size={{ xs: 12, lg: 8 }}>
                    {loadingHero && (
                        <Typography>Loading hero details...</Typography>
                    )}
                    {errorHero && (
                        <Typography>Error: {errorHero.message}</Typography>
                    )}
                    {dataHero && (
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <img
                                    src={hero.image}
                                    alt={hero.name}
                                    style={{ width: "100px", height: "100px" }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 8 }}>
                                <Typography variant="h6">
                                    {hero.name}
                                </Typography>
                                {heroStats.map((stat, index) => (
                                    <Typography key={index}>
                                        {stat.label}: {stat.value}
                                    </Typography>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default HomePage;