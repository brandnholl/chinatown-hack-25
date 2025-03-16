import { Icon } from "@iconify/react";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AnalyticCard from "./AnalyticsCard";
import theme from "./theme/theme";

const API_BASE_URL = "https://lowngdb.brandnholl.workers.dev";
const API_KEY = "ABCD1234";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const MotionPaper = motion(Paper);
const MotionListItem = motion(ListItem);
const MotionGrid = motion(Grid);

export default function Dashboard() {
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [stressData, setStressData] = useState(null);
  const [events, setEvents] = useState([]);
  const [openSlots, setOpenSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventPrompt, setEventPrompt] = useState("");
  const [suggestedTime, setSuggestedTime] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let interval;
    if (trackingStarted) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/record_predict`, {
            headers,
          });
          const data = await response.json();
          setStressData(data);
        } catch (error) {
          console.error("Error fetching stress data:", error);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [trackingStarted]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/events`, {
        headers,
      });
      const data = await response.json();
      setEvents(data.events || []);
      setOpenSlots(data.openSlots || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const scheduleEvent = async () => {
    if (!eventPrompt.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/schedule_event`, {
        method: "POST",
        headers,

        body: JSON.stringify({ event_prompt: eventPrompt }),
      });
      const data = await response.json();
      if (data.success || data.message) {
        setSuggestedTime(data.suggestedTime || "Scheduled!");

        fetchEvents();
      }
    } catch (error) {
      console.error("Error scheduling event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTracking = () => {
    setTrackingStarted(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEventPrompt("");
    setSuggestedTime(null);
  };

  let chartOptions = {};
  let chartSeries = [];
  if (stressData && stressData.data_log) {
    try {
      const parsedLog = JSON.parse(stressData.data_log);
      const timestamps = Object.keys(parsedLog);
      const stressValues = timestamps.map((time) =>
        Number(parsedLog[time]["Stress Percentage"])
      );
      chartOptions = {
        chart: {
          id: "stress-chart",
          animations: { enabled: false },
        },
        xaxis: { categories: timestamps },
        yaxis: { title: { text: "Stress Percentage" } },
      };
      chartSeries = [{ name: "Stress Percentage", data: stressValues }];
    } catch (error) {
      console.error("Error parsing stress data log:", error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          minHeight: "100vh",
          minWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        {/* Header */}
        <AppBar
          position="static"
          component={motion.div}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <Toolbar>
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Icon icon="mdi:brain" width="32" height="32" />
            </motion.div>
            <Typography
              variant="h6"
              component={motion.div}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              sx={{ flexGrow: 1, ml: 1 }}
            >
              AI Companion Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container sx={{ mt: 4, mb: 4 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Analytics Cards Section */}
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    variants={itemVariants}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <AnalyticCard
                      title="Current Stress Level"
                      value={
                        stressData ? `${stressData.stress_percentage}%` : "N/A"
                      }
                      iconComponent={
                        <Icon icon="mdi:brain-freeze" width="40" height="40" />
                      }
                      color="#FF5252"
                      gradientColor="#FF5252"
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    variants={itemVariants}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <AnalyticCard
                      title="Boredom Level"
                      value={
                        stressData ? `${stressData.boredom_percentage}%` : "N/A"
                      }
                      iconComponent={
                        <Icon
                          icon="solar:sleeping-circle-bold"
                          width="40"
                          height="40"
                        />
                      }
                      color="#FFC107"
                      gradientColor="#FFC107"
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    variants={itemVariants}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <AnalyticCard
                      title="Events Today"
                      value={events.length}
                      iconComponent={
                        <Icon
                          icon="solar:calendar-bold"
                          width="40"
                          height="40"
                        />
                      }
                      color="#4CAF50"
                      gradientColor="#4CAF50"
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    variants={itemVariants}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <AnalyticCard
                      title="Available Slots"
                      value={openSlots.length}
                      iconComponent={
                        <Icon
                          icon="solar:clock-circle-bold"
                          width="40"
                          height="40"
                        />
                      }
                      color="#2196F3"
                      gradientColor="#2196F3"
                    />
                  </motion.div>
                </Grid>
              </Grid>
            </Box>

            {/* Tracking Section */}
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <MotionPaper
                  variants={itemVariants}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  sx={{ p: 4, textAlign: "center" }}
                >
                  {!trackingStarted ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleStartTracking}
                      >
                        Start Tracking Stress Levels{" "}
                        <Icon
                          icon="mdi:chart-line"
                          width="24"
                          height="24"
                          style={{ marginLeft: 8 }}
                        />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography variant="h5" gutterBottom>
                        Tracking in progress...
                      </Typography>
                      {stressData ? (
                        <Box>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                              <Box sx={{ textAlign: "left", p: 2 }}>
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  <Typography variant="h6" gutterBottom>
                                    Analysis Report
                                  </Typography>
                                  <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Report:</strong> {stressData.report}
                                  </Typography>
                                  {stressData.labels && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                      <strong>Labels:</strong>{" "}
                                      {stressData.labels.join(", ")}
                                    </Typography>
                                  )}
                                </motion.div>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              {chartSeries.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                  <Box sx={{ mt: 1 }}>
                                    <Chart
                                      options={chartOptions}
                                      series={chartSeries}
                                      type="line"
                                      height={300}
                                    />
                                  </Box>
                                </motion.div>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      ) : (
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          Waiting for data...
                        </Typography>
                      )}
                    </motion.div>
                  )}
                </MotionPaper>
              </Grid>

              {/* Two-column layout for Calendar and Chatbot */}
              <Grid item xs={12} md={7}>
                {/* Calendar Section */}
                <MotionPaper
                  variants={itemVariants}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  sx={{ p: 4, height: "100%" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography variant="h4">Today's Schedule</Typography>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<Icon icon="mdi:calendar-plus" />}
                        onClick={handleOpenDialog}
                      >
                        Schedule Event
                      </Button>
                    </motion.div>
                  </Box>

                  {loading ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", p: 3 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      >
                        <CircularProgress />
                      </motion.div>
                    </Box>
                  ) : events.length > 0 ? (
                    <List>
                      <AnimatePresence>
                        {events.map((event, index) => (
                          <MotionListItem
                            key={index}
                            divider
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                          >
                            <ListItemText
                              primary={event.summary}
                              secondary={`${new Date(
                                event.start
                              ).toLocaleTimeString()} - ${new Date(
                                event.end
                              ).toLocaleTimeString()}`}
                            />
                          </MotionListItem>
                        ))}
                      </AnimatePresence>
                    </List>
                  ) : (
                    <Typography variant="body1">
                      No events scheduled for today.
                    </Typography>
                  )}
                </MotionPaper>
              </Grid>

              {/* Chatbot Companion Section */}
              <Grid item xs={12} md={5}>
                <MotionPaper
                  variants={itemVariants}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  sx={{ p: 4, height: "100%" }}
                >
                  <Typography variant="h4" gutterBottom>
                    Chatbot Companion
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                        mb: 3,
                        p: 2,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body1" gutterBottom>
                        Hello! I'm your AI companion. How are you feeling today?
                      </Typography>
                    </Box>
                    <motion.div>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Start Chat{" "}
                        <Icon
                          icon="mdi:chat"
                          width="24"
                          height="24"
                          style={{ marginLeft: 8 }}
                        />
                      </Button>
                    </motion.div>
                  </Box>
                </MotionPaper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Event Scheduling Dialog */}
      <AnimatePresence>
        {openDialog && (
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth="sm"
            PaperComponent={motion.div}
            PaperProps={{
              initial: { opacity: 0, y: 50, scale: 0.9 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 50, scale: 0.9 },
              transition: { duration: 0.3 },
            }}
          >
            <DialogTitle>Schedule New Event</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="eventPrompt"
                label="What would you like to schedule?"
                type="text"
                fullWidth
                variant="outlined"
                value={eventPrompt}
                onChange={(e) => setEventPrompt(e.target.value)}
                sx={{ mb: 3 }}
              />

              <AnimatePresence>
                {suggestedTime && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Suggested Time:
                      </Typography>
                      <Typography variant="body1">{suggestedTime}</Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {openSlots.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ mt: 2, mb: 1 }}>
                      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                        Available Time Slots:
                      </Typography>
                      <List dense>
                        <AnimatePresence>
                          {openSlots.map((slot, index) => (
                            <MotionListItem
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{
                                backgroundColor: "rgba(0,0,0,0.04)",
                                x: 5,
                              }}
                            >
                              <ListItemText
                                primary={`${new Date(
                                  slot[0]
                                ).toLocaleTimeString()} - ${new Date(
                                  slot[1]
                                ).toLocaleTimeString()}`}
                              />
                            </MotionListItem>
                          ))}
                        </AnimatePresence>
                      </List>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogContent>
            <DialogActions>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={handleCloseDialog}>Cancel</Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={scheduleEvent}
                  variant="contained"
                  disabled={!eventPrompt.trim() || loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Schedule"}
                </Button>
              </motion.div>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
