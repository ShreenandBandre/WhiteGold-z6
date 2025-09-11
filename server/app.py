import streamlit as st
import numpy as np
import joblib

# ==========================
# Load Crop Recommendation Model
# ==========================
try:
    crop_model = joblib.load("models/crop_recommendation_model.joblib")
    scaler = joblib.load("models/scaler.joblib")
except FileNotFoundError:
    st.error("Model files not found. Please ensure 'crop_recommendation_model.joblib' and 'scaler.joblib' are in the 'models' directory.")
    st.stop()

# ==========================
# Crop Metadata Dictionary
# ==========================
crop_metadata = {
    'rice': {
        'soil': 'Clayey, Loamy',
        'season': 'Kharif (Monsoon)',
        'cycle': '120-150 days',
        'notes': 'Requires standing water & high rainfall.',
        'confidence_ranges': {
            'N': [60.0, 99.0],
            'P': [35.0, 60.0],
            'K': [35.0, 45.0],
            'temperature': [20.0454142, 26.92995077],
            'humidity': [80.12267476, 84.96907151],
            'ph': [5.005306977, 7.868474653],
            'rainfall': [182.5616319, 298.5601175]
        }
    },
    'maize': {
        'soil': 'Loamy sand to clay loam',
        'season': 'Kharif, Rabi, Spring',
        'cycle': '90-110 days',
        'notes': 'Optimum temp. 18-32°C. Needs good sunlight and moderate rainfall.',
        'confidence_ranges': {
            'N': [60.0, 100.0],
            'P': [35.0, 60.0],
            'K': [15.0, 25.0],
            'temperature': [18.04185513, 26.54986394],
            'humidity': [55.28220433, 74.82913698],
            'ph': [5.513697923, 6.995843776],
            'rainfall': [60.65171481, 109.751538]
        }
    },
    'chickpea': {
        'soil': 'Sandy loam, pH 6.0-7.5',
        'season': 'Spring, Fall (90-120 days)',
        'cycle': '90-120 days',
        'notes': 'Drought-tolerant. Best temp 21-27°C. Needs 6 hours of sun.',
        'confidence_ranges': {
            'N': [20.0, 60.0],
            'P': [55.0, 80.0],
            'K': [75.0, 85.0],
            'temperature': [17.02498457, 20.9950222],
            'humidity': [14.25804046, 19.96978875],
            'ph': [5.988992686, 8.86874149],
            'rainfall': [65.11365582, 94.78189626]
        }
    },
    'kidneybeans': {
        'soil': 'Loamy, well-drained, pH 6-7',
        'season': 'Not specified',
        'cycle': '90-100 days',
        'notes': 'Warm temp. 21-26°C day, 15-21°C night. Full sun.',
        'confidence_ranges': {
            'N': [0.0, 40.0],
            'P': [55.0, 80.0],
            'K': [15.0, 25.0],
            'temperature': [15.33042603, 24.92360126],
            'humidity': [18.09224021, 24.96969947],
            'ph': [5.502998871, 5.998125482],
            'rainfall': [60.27552541, 149.7441032]
        }
    },
    'pigeonpeas': {
        'soil': 'Black cotton soils, pH 7.0-8.5',
        'season': 'Rainy (Kharif), Post-rainy (Rabi)',
        'cycle': 'Not specified',
        'notes': 'Drought tolerant. Temp 26-30°C rainy, 17-22°C post-rainy.',
        'confidence_ranges': {
            'N': [0.0, 40.0],
            'P': [55.0, 80.0],
            'K': [15.0, 25.0],
            'temperature': [18.31910403, 36.97794354],
            'humidity': [30.40046838, 69.69141344],
            'ph': [4.548201552, 7.44544539],
            'rainfall': [90.05422731, 198.8298813]
        }
    },
    'mothbeans': {
        'soil': 'Variety of soils, even salinity',
        'season': 'Not specified',
        'cycle': '4-5 months',
        'notes': 'Drought-resistant. Thrives in full sun. Temp 24-32°C.',
        'confidence_ranges': {
            'N': [20.0, 40.0],
            'P': [20.0, 40.0],
            'K': [20.0, 40.0],
            'temperature': [24.08984992, 35.84594149],
            'humidity': [48.11893116, 68.9669642],
            'ph': [4.520443914, 7.435759976],
            'rainfall': [50.19835749, 139.6919488]
        }
    },
    'mungbean': {
        'soil': 'Loamy to sandy loam',
        'season': 'Not specified',
        'cycle': '60-90 days',
        'notes': 'Warm humid climate. Temp 25-35°C. Does not grow well in saline soils.',
        'confidence_ranges': {
            'N': [20.0, 40.0],
            'P': [0.0, 10.0],
            'K': [20.0, 40.0],
            'temperature': [28.53039626, 39.84976766],
            'humidity': [80.16044738, 89.98800539],
            'ph': [5.506161109, 6.995966453],
            'rainfall': [40.1646272, 59.9079965]
        }
    },
    'blackgram': {
        'soil': 'Mixed black calcareous or red soil',
        'season': 'Pre-monsoon sowing',
        'cycle': 'Not specified',
        'notes': 'Rain-fed crop, requires proper soil management.',
        'confidence_ranges': {
            'N': [20.0, 40.0],
            'P': [0.0, 10.0],
            'K': [20.0, 40.0],
            'temperature': [29.07132236, 35.8974668],
            'humidity': [60.10173678, 70.97818987],
            'ph': [6.000305011, 7.498873091],
            'rainfall': [60.18320959, 109.9328248]
        }
    },
    'lentil': {
        'soil': 'Heavy, deep, sandy loams, loam, and clay loam, pH 6-8',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Sensitive to waterlogging. Needs free-draining soil.',
        'confidence_ranges': {
            'N': [0.0, 40.0],
            'P': [60.0, 80.0],
            'K': [15.0, 25.0],
            'temperature': [18.11581403, 21.8492063],
            'humidity': [60.01502446, 64.95378738],
            'ph': [5.513470691, 7.495204481],
            'rainfall': [60.02103131, 109.843644]
        }
    },
    'pomegranate': {
        'soil': 'Well-drained with good organic matter',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Grows well in semi-arid conditions. Hot, dry summers and cold winters.',
        'confidence_ranges': {
            'N': [0.0, 40.0],
            'P': [0.0, 10.0],
            'K': [35.0, 50.0],
            'temperature': [20.10659681, 25.96102602],
            'humidity': [70.19799276, 89.96918928],
            'ph': [5.500244199, 7.473551528],
            'rainfall': [100.1019616, 110.0478203]
        }
    },
    'banana': {
        'soil': 'Soils with good fertility',
        'season': 'Rainfed: April-May. Irrigated: August-Sept.',
        'cycle': 'Not specified',
        'notes': 'Tropical humid lowlands. Optimum temp 27°C. Avoid heavy monsoons.',
        'confidence_ranges': {
            'N': [80.0, 100.0],
            'P': [80.0, 100.0],
            'K': [45.0, 55.0],
            'temperature': [26.00282928, 30.01588636],
            'humidity': [70.08412808, 89.93294248],
            'ph': [5.500045435, 7.009023774],
            'rainfall': [100.0963385, 120.0883204]
        }
    },
    'mango': {
        'soil': 'Lateritic, alluvial, sandy loam, sandy. Loamy, well-drained, pH 5.5-7.5',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Tropical and subtropical. Ideal temp 24-30°C. Dry weather before blossoming is conducive.',
        'confidence_ranges': {
            'N': [20.0, 40.0],
            'P': [10.0, 20.0],
            'K': [20.0, 30.0],
            'temperature': [26.0441017, 30.00512686],
            'humidity': [50.06351838, 59.98730419],
            'ph': [5.500042459, 7.003189999],
            'rainfall': [100.0096236, 110.0577908]
        }
    },
    'grapes': {
        'soil': 'Sandy loams, sandy clay loams, red sandy soils, black soils, red loams, pH 6.5-8.0',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Requires hot and dry climate. Temp 15-40°C. High humidity is detrimental.',
        'confidence_ranges': {
            'N': [0.0, 40.0],
            'P': [15.0, 25.0],
            'K': [15.0, 25.0],
            'temperature': [21.05055171, 40.0460481],
            'humidity': [80.01878931, 89.97017835],
            'ph': [5.510006325, 7.002347714],
            'rainfall': [60.00762118, 109.9190186]
        }
    },
    'watermelon': {
        'soil': 'Well-drained, sandy loam',
        'season': 'Summer, not specified',
        'cycle': 'Not specified',
        'notes': 'Thrives in hot and dry weather.',
        'confidence_ranges': {
            'N': [80.0, 100.0],
            'P': [0.0, 10.0],
            'K': [15.0, 25.0],
            'temperature': [25.0118671, 29.98634812],
            'humidity': [50.0135832, 59.98150499],
            'ph': [6.001096727, 6.99863032],
            'rainfall': [40.08272522, 59.98972583]
        }
    },
    'muskmelon': {
        'soil': 'Well-drained sandy or silt loam',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Thrives in hot, dry weather. Temp 18.3-23.9°C.',
        'confidence_ranges': {
            'N': [80.0, 100.0],
            'P': [0.0, 10.0],
            'K': [40.0, 50.0],
            'temperature': [26.0270081, 30.0069542],
            'humidity': [90.00441865, 94.99612984],
            'ph': [6.001646062, 7.000300957],
            'rainfall': [20.02102875, 40.08419614]
        }
    },
    'apple': {
        'soil': 'Loamy soils, rich in organic matter, pH 5.5-6.5',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Grown at high altitudes. Temp 21-24°C during growing season.',
        'confidence_ranges': {
            'N': [0.0, 40.0],
            'P': [130.0, 145.0],
            'K': [190.0, 205.0],
            'temperature': [13.49250109, 23.49250109],
            'humidity': [90.10095116, 94.9945371],
            'ph': [5.500366166, 6.499879708],
            'rainfall': [100.0042467, 110.0060965]
        }
    },
    'orange': {
        'soil': 'Medium or light loamy soils, well-drained, pH 6.0-8.0',
        'season': 'July-August',
        'cycle': 'Not specified',
        'notes': 'Frost-free tropical/sub-tropical regions. Temp 10-35°C.',
        'confidence_ranges': {
            'N': [0.0, 40.0],
            'P': [0.0, 10.0],
            'K': [0.0, 10.0],
            'temperature': [10.0101666, 14.9962136],
            'humidity': [90.0009673, 94.99596861],
            'ph': [6.002978589, 7.000216401],
            'rainfall': [90.02568019, 109.9573562]
        }
    },
    'papaya': {
        'soil': 'Well-drained rich sandy loam or medium black soils, pH 6.5-7',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Tropical crop. Temp 25-30°C. Avoid strong winds.',
        'confidence_ranges': {
            'N': [31.0, 70.0],
            'P': [46.0, 70.0],
            'K': [45.0, 55.0],
            'temperature': [23.0124018, 43.67549305],
            'humidity': [90.03863107, 94.94482086],
            'ph': [6.501521192, 6.993473247],
            'rainfall': [40.35153141, 248.8592986]
        }
    },
    'coconut': {
        'soil': 'Almost all soil types with proper drainage, pH 5.0-8.0',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Tropical plant. Ideal temp 27°C. Requires plenty of sunlight.',
        'confidence_ranges': {
            'N': [0.0, 40.0],
            'P': [5.0, 30.0],
            'K': [25.0, 35.0],
            'temperature': [25.00872392, 29.8690834],
            'humidity': [90.01734526, 99.98187601],
            'ph': [5.50158009, 6.470465614],
            'rainfall': [131.0900076, 209.5085461]
        }
    },
    'cotton': {
        'soil': 'Well-drained alluvial, black clayey, black and mixed black and red soils',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Semi-xerophyte. Tropical/sub-tropical. Optimum temp 21-27°C.',
        'confidence_ranges': {
            'N': [100.0, 140.0],
            'P': [45.0, 60.0],
            'K': [40.0, 50.0],
            'temperature': [20.01809006, 30.01525492],
            'humidity': [70.06307133, 80.99955447],
            'ph': [5.502967169, 7.009312521],
            'rainfall': [70.16873551, 109.9197022]
        }
    },
    'jute': {
        'soil': 'All types, but loamy alluvial soils are best, pH 5.0-7.4',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Hot, humid regions. Rainfall ~2500mm. Temp 15-34°C.',
        'confidence_ranges': {
            'N': [60.0, 100.0],
            'P': [35.0, 60.0],
            'K': [40.0, 50.0],
            'temperature': [20.0053913, 26.96973345],
            'humidity': [80.04018933, 84.99616035],
            'ph': [5.50207212, 7.003975058],
            'rainfall': [150.0526955, 209.9902646]
        }
    },
    'coffee': {
        'soil': 'Volcanic red earth or deep, friable, well-drained loams',
        'season': 'Not specified',
        'cycle': 'Not specified',
        'notes': 'Cool, equable temp (15-25°C for Arabica), hot, humid (20-30°C for Robusta).',
        'confidence_ranges': {
            'N': [80.0, 120.0],
            'P': [25.0, 40.0],
            'K': [25.0, 35.0],
            'temperature': [20.0101666, 29.9868846],
            'humidity': [50.00399127, 69.96767597],
            'ph': [5.500259838, 7.49836376],
            'rainfall': [100.0384814, 159.9575997]
        }
    }
}

# ==========================
# Sidebar Inputs
# ==========================
st.title("🌱 Agri Dash - Crop Recommendation System")

st.subheader("Enter Soil & Climate Parameters")

N = st.slider("Nitrogen (N)", 0, 140, 50)
P = st.slider("Phosphorus (P)", 0, 140, 50)
K = st.slider("Potassium (K)", 0, 200, 50)
temperature = st.slider("Temperature (°C)", 0, 50, 25)
humidity = st.slider("Humidity (%)", 0, 100, 70)
ph = st.slider("Soil pH", 0.0, 14.0, 6.5)
rainfall = st.slider("Rainfall (mm)", 0, 500, 120)

# Prepare input
input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
scaled_input = scaler.transform(input_data)

# ==========================
# Prediction
# ==========================
if st.button("Get Crop Recommendations"):
    # Probabilities for each crop
    probabilities = crop_model.predict_proba(scaled_input)[0]
    crop_classes = crop_model.classes_

    # Sort by highest probability
    top_indices = np.argsort(probabilities)[::-1][:3]
    top_crops = [(crop_classes[i], probabilities[i] * 100) for i in top_indices]

    # Dashboard metrics
    st.subheader("📊 Dashboard Metrics")
    col1, col2, col3 = st.columns(3)

    # 🌱 Top crop
    top_crop, top_prob = top_crops[0]
    with col1:
        st.metric("🌱 Top Crop", top_crop.capitalize(), f"{top_prob:.2f}%")

    # 💚 Avg health score
    avg_score = np.mean([prob for _, prob in top_crops])
    if avg_score > 80:
        health_status = "Excellent condition"
    elif avg_score > 60:
        health_status = "Moderate condition"
    else:
        health_status = "Poor condition"

    with col2:
        st.metric("💚 Avg Score among 3", f"{avg_score:.2f}%", health_status)

    # ⚡ AI Accuracy
    if top_prob > 90:
        acc_status = "High confidence"
    elif top_prob > 70:
        acc_status = "Medium confidence"
    else:
        acc_status = "Low confidence"

    with col3:
        st.metric("⚡ AI Accuracy", f"{top_prob:.2f}%", acc_status)

    # Recommended crops as cards
    st.subheader("✅ Top 3 Recommended Crops")
    col1, col2, col3 = st.columns(3)
    columns = [col1, col2, col3]

    for idx, (crop, prob) in enumerate(top_crops):
        with columns[idx]:
            if crop in crop_metadata:
                details = crop_metadata[crop]
                st.markdown(f"""
                    <div style='
                        border: 2px solid #4CAF50; 
                        border-radius: 15px; 
                        padding: 15px; 
                        background-color: #0000;
                        text-align: center;
                        box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                    '>
                        <h3 style='color: #2E7D32;'>{crop.upper()}</h3>
                        <p><strong>Confidence:</strong> {prob:.2f}%</p>
                        <p><strong>Soil:</strong> {details['soil']}</p>
                        <p><strong>Season:</strong> {details['season']}</p>
                        <p><strong>Cycle:</strong> {details['cycle']}</p>
                        <p><strong>Notes:</strong> {details['notes']}</p>
                    </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown(f"""
                    <div style='
                        border: 2px solid #f44336; 
                        border-radius: 15px; 
                        padding: 15px; 
                        background-color: #fff0f0;
                        text-align: center;
                    '>
                        <h3>{crop.upper()}</h3>
                        <p>Confidence: {prob:.2f}%</p>
                        <p>No details available.</p>
                    </div>
                """, unsafe_allow_html=True)

    # ==========================
    # Recent Activity (Session State)
    # ==========================
    if "recent_activity" not in st.session_state:
        st.session_state.recent_activity = []

    # Add latest recommendation to recent activity
    activity_entry = {
        "top_crop": ", ".join([crop.capitalize() for crop, _ in top_crops]),
        "probability": f"{top_prob:.2f}%",
        "avg_score": f"{avg_score:.2f}%",
        "accuracy": acc_status
    }
    st.session_state.recent_activity.insert(0, activity_entry)

# ==========================
# Show Recent Activity (Always visible)
# ==========================
if "recent_activity" in st.session_state and st.session_state.recent_activity:
    st.subheader("🕒 Recent Activity")

    for i, activity in enumerate(st.session_state.recent_activity[:5]):  # show last 5
        st.markdown(f"""
            <div style='
                border-left: 6px solid #1565c0;
                border-radius: 12px;
                padding: 15px 20px;
                margin-bottom: 12px;
                background: linear-gradient(135deg, #12fg5, #0000);
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                font-family: "Segoe UI", sans-serif;
            '>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="margin:0; color:#0d47a1;">#{i+1} • {activity['top_crop']}</h4>
                    <span style="font-size:12px; color:#555;">{activity.get('time','')}</span>
                </div>
                <hr style="border:0; border-top:1px solid #e3f2fd; margin:6px 0;">
                <p style="margin:4px 0; font-size:14px;"><strong>🌱 Confidence:</strong> {activity['probability']}</p>
                <p style="margin:4px 0; font-size:14px;"><strong>💚 Avg Score:</strong> {activity['avg_score']}</p>
                <p style="margin:4px 0; font-size:14px;"><strong>⚡ Accuracy:</strong> {activity['accuracy']}</p>
            </div>
        """, unsafe_allow_html=True)
