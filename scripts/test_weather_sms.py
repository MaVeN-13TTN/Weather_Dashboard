"""
Tests for the scheduled weather update SMS script.
"""

import unittest
from unittest.mock import patch, Mock
from daily_weather_text import get_weather, send_weather_sms
from requests.exceptions import RequestException


class WeatherSMSTests(unittest.TestCase):
    """Test cases for the weather SMS script."""

    @patch("daily_weather_text.requests.get")
    def test_get_weather_success(self, mock_get):
        """Test get_weather function with a successful API response."""
        # Mock the API response
        mock_response = Mock()
        mock_response.json.return_value = {
            "main": {"temp": 25.5, "feels_like": 26, "humidity": 70},
            "weather": [{"description": "clear sky"}],
        }
        mock_get.return_value = mock_response

        # Call the function and check the result
        weather_message = get_weather()
        self.assertIsNotNone(weather_message)
        self.assertTrue("Temperature: 25.5" in weather_message)
        self.assertTrue("Feels like: 26" in weather_message)
        self.assertTrue("Description: clear sky" in weather_message)
        self.assertTrue("Humidity: 70%" in weather_message)

    @patch("daily_weather_text.requests.get")
    def test_get_weather_failure(self, mock_get):
        """Test get_weather function with a failed API response."""
        # Mock the API response to raise an exception
        mock_get.side_effect = RequestException("API request failed")

        # Call the function and check the result
        weather_message = get_weather()
        self.assertIsNone(weather_message)

    @patch("daily_weather_text.Client")
    def test_send_weather_sms_success(self, mock_client):
        """Test send_weather_sms function with a successful SMS send."""
        # Mock the Twilio client and message creation
        mock_message = Mock()
        mock_message.sid = "SM1234567890"
        mock_client.return_value.messages.create.return_value = mock_message

        # Call the function with a mock weather message
        with patch(
            "daily_weather_text.get_weather", return_value="Test weather message"
        ):
            send_weather_sms()

        # Check that the Twilio client was called with the correct arguments
        mock_client.return_value.messages.create.assert_called_once_with(
            body="Test weather message", from_="+16283364296", to="+254728446824"
        )

    @patch("daily_weather_text.Client")
    def test_send_weather_sms_failure(self, mock_client):
        """Test send_weather_sms function with a failed SMS send."""
        # Call the function with a None weather message
        with patch("daily_weather_text.get_weather", return_value=None):
            send_weather_sms()

        # Check that the Twilio client was not called
        mock_client.return_value.messages.create.assert_not_called()


if __name__ == "__main__":
    unittest.main()
