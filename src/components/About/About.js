import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const About = () => {
  return (
    <div>
      <Card className="tasks__card" raised>
        <CardHeader title="About" />

        <CardContent>
          <Typography align="center" paragraph>
            Awesome Google Tasks is an alternative web client for Google Tasks.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
