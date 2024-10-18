import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Container,
} from "@mui/material";

const GET_USER_BUILDS = gql`
    query GetUserBuilds {
        userBuilds {
            id
            hero {
                name
                image
            }
            buildName
            level
            health
            attack
            defense
        }
    }
`;

const ADD_BUILD = gql`
    mutation AddBuild($build: BuildInput!) {
        addBuild(build: $build) {
            id
            buildName
        }
    }
`;

const UserDash = () => {
    const { loading, error, data } = useQuery(GET_USER_BUILDS);
    const [addBuild] = useMutation(ADD_BUILD);
    const [open, setOpen] = useState(false);
    const [newBuild, setNewBuild] = useState({
        buildName: "",
        level: "",
        health: "",
        attack: "",
        defense: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBuild((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddBuild = async () => {
        try {
            await addBuild({ variables: { build: newBuild } });
            handleClose();
            // Optionally refetch the builds or update the state to include the new build
        } catch (error) {
            console.error("Error adding build:", error);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Your Hero Builds
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add New Build
            </Button>
            <Grid container spacing={4} style={{ marginTop: "20px" }}>
                {data.userBuilds.map((build) => (
                    <Grid item xs={12} sm={6} md={4} key={build.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {build.buildName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Level: {build.level}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Health: {build.health}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Attack: {build.attack}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Defense: {build.defense}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                                <Button size="small" color="secondary">
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Build</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new build, please enter the build details here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="buildName"
                        label="Build Name"
                        type="text"
                        fullWidth
                        value={newBuild.buildName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="level"
                        label="Level"
                        type="number"
                        fullWidth
                        value={newBuild.level}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="health"
                        label="Health"
                        type="number"
                        fullWidth
                        value={newBuild.health}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="attack"
                        label="Attack"
                        type="number"
                        fullWidth
                        value={newBuild.attack}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="defense"
                        label="Defense"
                        type="number"
                        fullWidth
                        value={newBuild.defense}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddBuild} color="primary">
                        Add Build
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserDash;