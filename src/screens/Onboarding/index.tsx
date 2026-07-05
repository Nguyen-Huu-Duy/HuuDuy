// src/screens/Onboarding/index.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Nội dung 3 slide
const slides = [
  {
    id: 1,
    icon: '🧹',
    title: 'Dọn dẹp chuyên nghiệp',
    desc: 'Đội ngũ Tasker được đào tạo bài bản, tận tâm với từng góc nhà của bạn.',
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Đặt lịch trong 60 giây',
    desc: 'Chọn dịch vụ, chọn giờ, xác nhận. Nhanh hơn cả pha một ly cà phê.',
  },
  {
    id: 3,
    icon: '⭐',
    title: 'Tin tưởng tuyệt đối',
    desc: 'Mọi Tasker đều được kiểm tra lý lịch và đánh giá bởi hàng nghìn khách hàng.',
  },
];

export default function Onboarding({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login'); // slide cuối → đi đến Login
    }
  };

  const slide = slides[currentIndex];

  return (
    <View style={styles.container}>
      {/* Nội dung slide */}
      <View style={styles.content}>
        <Text style={styles.icon}>{slide.icon}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.desc}>{slide.desc}</Text>
      </View>

      {/* Chấm tròn chỉ vị trí slide */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* Nút tiếp theo */}
      <TouchableOpacity style={styles.button} onPress={goNext}>
        <Text style={styles.buttonText}>
          {currentIndex < slides.length - 1 ? 'Tiếp theo →' : 'Bắt đầu ngay'}
        </Text>
      </TouchableOpacity>

      {/* Bỏ qua */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.skip}>Bỏ qua</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    marginBottom: 48,
  },
  icon: {
    fontSize: 100,
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
  },
  desc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
  },
  dotActive: {
    backgroundColor: '#FF6B35',
    width: 24, // chấm active dài hơn
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: width - 64,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skip: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
  },
});