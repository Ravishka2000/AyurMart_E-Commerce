import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TurnedInTwoToneIcon from '@mui/icons-material/TurnedInTwoTone';
import StarsIcon from '@mui/icons-material/Stars';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PublicIcon from '@mui/icons-material/Public';
import SpaIcon from '@mui/icons-material/Spa';
import BusinessIcon from '@mui/icons-material/Business';

const ContactBanner = styled(Box)({
    color: '#262A56',
    padding: '10px',
    width: '100%',
    textAlign: 'center',
    marginTop: '75px',
    backgroundImage: 'url(https://img.freepik.com/free-photo/abstract-blur-defocused-pharmacy-drug-store_1203-9459.jpg?w=996&t=st=1681135634~exp=1681136234~hmac=a8076cfce67b40920b2378b97111f1f847be29fb52a1ea656856293ac511f24c)',
});


const AboutUsPage = () => {

    return (

        <div style={{ flexGrow: 1, padding: '16px' }}>
            <ContactBanner>
                {<br />}
                <section style={{ display: "flex", alignItems: "center", color: "#19376D", justifyContent: "center" }}>
                    <SpaIcon sx={{ transform: "scale(2)" }} />
                    <Typography sx={{
                        fontSize: "2rem",
                        paddingLeft: "2%",
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                        AYURMART
                    </Typography>
                </section>
                <Typography variant="h6" color={"#4C4B16"}>
                    Since 1988
                </Typography>
                <br /><br />

            </ContactBanner>


            {/* Our Story */}
            <section style={{ margin: '32px 0' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <img
                            src="https://img.freepik.com/free-photo/young-woman-pharmacist-pharmacy_1303-25532.jpg?size=626&ext=jpg"
                            alt="Our Story"
                            style={{ width: '600px', height: '350px', marginTop: '16px', marginBottom: '16px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7} style={{ backgroundColor: '#ffff' }}>
                        <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D' }}>
                            {<br />}{<br />}Our Story
                        </Typography>
                        <Typography style={{ textAlign: 'justify', fontSize: '1.0rem', backgroundColor: '#ffff' }}>
                            AYURMART, a subsidiary of Sunshine Healthcare, is the 1st branded retail Healthcare Chain in Sri Lanka.
                            The Company entered the market with a view of creating differentiated offering and retailing experience to the consumer.
                            The organization, headed by a team of professionals, has introduced an innovative retail concept centered on exceptional
                            shopper experience through service, technology, product offering, pricing and a host of value additions.
                            Through this innovative concept Healthguard has gained market leadership position in Drug Store Retailing with a loyal consumer base.
                        </Typography>
                    </Grid>
                </Grid>
            </section>

            {/* Our Mission */}
            <section style={{ margin: '32px 0' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D' }}>
                            <br />Our Mission
                        </Typography>
                        <Typography style={{ textAlign: 'justify', fontSize: '1.0rem' }}>
                            AYURMART is on a mission to make health and wellness accessible to all.
                            Since our founding in 1996, we have been dedicated to offering Earth’s best-curated selection of health and wellness products,
                            at the best possible value, delivered with the most convenient experience. We believe that health and wellness should be a universal right
                            made possible through compassion and our collective action. This belief will continue to guide us as we endeavor to make our mission a reality.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img
                            src="https://img.freepik.com/free-photo/young-cute-female-posing-indoor_344912-967.jpg?size=626&ext=jpg"
                            alt="Our Mission"
                            style={{ width: '600px', height: '350px', marginBottom: '16px' }}
                        />
                    </Grid>

                </Grid>

            </section>

            {/* Our describution */}
            <section style={{ margin: '32px 0', backgroundColor: '#FCFFE7 ' }}>
                <Typography>
                    <br />
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>

                        <Typography align='center'>
                            <LocationOnIcon fontSize="large" sx={{ color: '#7AA874' }} />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            185+ countries
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='center'>
                            We deliver health and wellness products to people around the world with 16 languages, 86 currencies, and 38 payment options.
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Typography align='center'>
                            <TurnedInTwoToneIcon fontSize="large" sx={{ color: '#7AA874' }} />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            30K+ products
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='center'>
                            We offer the same reputable brands found at large national stores. All products are sold and shipped by iHerb—not by third-party sellers.
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Typography align='center'>
                            <StarsIcon fontSize="large" sx={{ color: '#7AA874' }} />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            24M+ authentic reviews
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='center'>
                            Impartial authenic reviews by customers who ordered the product. This way you can make smarter purchases.
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Typography align='center'>
                            <VerifiedUserIcon fontSize="large" sx={{ color: '#7AA874' }} />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            800K+ active customers
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='center'>
                            Over 11 million customers keep coming back for our deals, products, and Rewards.
                        </Typography>


                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Typography align='center'>
                            <PublicIcon fontSize="large" sx={{ color: '#7AA874' }} />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            2000+ team members
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='center'>
                            We’re truly a global company with team members around the world.
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Typography align='center'>
                            <BusinessIcon fontSize="large" sx={{ color: '#7AA874' }} />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            7 fulfillment centers
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='center'>
                            Our fulfillment centers and inventory hubs are climate-controlled and GMP- or ISO-compliant to keep products safe and fresh.
                        </Typography>

                    </Grid>
                    <br />
                </Grid>
                <Typography>
                    <br />
                </Typography>
            </section>
            <br /><br />
            <senction style={{ margin: '32px 0' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image="https://img.freepik.com/free-photo/bearded-doctor-glasses_23-2147896187.jpg?size=626&ext=jpg"
                                alt="team member"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Jane Doe (Founder)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod varius augue a ultricies.
                                    Duis at dolor vitae tortor semper tincidunt vel ac nisl. Nam ac fringilla urna.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?size=626&ext=jpg"
                                alt="team member"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Jane Doe (Co-Founder)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod varius augue a ultricies.
                                    Duis at dolor vitae tortor semper tincidunt vel ac nisl. Nam ac fringilla urna.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image="https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?size=626&ext=jpg"
                                alt="team member"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Jane Doe (Co-Founder)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod varius augue a ultricies.
                                    Duis at dolor vitae tortor semper tincidunt vel ac nisl. Nam ac fringilla urna.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </senction>
        </div>
    );
};

export default AboutUsPage;
