import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const AboutUsPage = () => {

  return (
    <div style={{ flexGrow: 1, padding: '16px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        About Us
      </Typography>
      <Divider />

      {/* Our Story */}
      <section style={{ margin: '32px 0' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img
              src="https://img.freepik.com/free-vector/health-professional-team-concept-illustration_114360-1608.jpg?size=626&ext=jpg"
              alt="Our Story"
              style={{ width: '600px', height: '350px', marginTop: '16px', marginBottom: '16px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
          {<br/>}{<br/>}Our Story
          </Typography>
            <Typography style={{ textAlign: 'justify', fontSize: '1.1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod varius augue a ultricies. Duis at
              dolor vitae tortor semper tincidunt vel ac nisl. Nam ac fringilla urna. Nullam eleifend odio felis, at
              lacinia eros sollicitudin non. Integer malesuada vitae tellus sit amet euismod. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed pulvinar elit vel nisl commodo
              laoreet. Integer id arcu id quam elementum molestie.
            </Typography>
          </Grid>
        </Grid>
      </section>

      {/* Our Mission */}
      <section style={{ margin: '32px 0' }}>
        <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
        {<br/>}{<br/>}Our Mission
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography style={{ textAlign: 'justify', fontSize: '1.1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod varius augue a ultricies. Duis at
              dolor vitae tortor semper tincidunt vel ac nisl. Nam ac fringilla urna. Nullam eleifend odio felis, at
              lacinia eros sollicitudin non. Integer malesuada vitae tellus sit amet euismod. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed pulvinar elit vel nisl commodo
              laoreet. Integer id arcu id quam elementum molestie.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
          <img
              src="https://img.freepik.com/free-vector/online-doctor-concept_23-2148506884.jpg?size=626&ext=jpg"
              alt="Our Mission"
              style={{ width: '600px', height: '400px',  marginBottom: '16px' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
              <Card sx={{ maxWidth: 345 }}>
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
              <Card sx={{ maxWidth: 345 }}>
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
              <Card sx={{ maxWidth: 345 }}>
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
        </section>
  
        {/* Our Partners */}
        
      </div>
    );
  };
  
  export default AboutUsPage;
  