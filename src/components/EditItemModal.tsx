import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { ShoppingItem } from '../types/shopping';

interface Props {
  visible: boolean;
  item: ShoppingItem | null;
  onSave: (item: ShoppingItem) => void;
  onClose: () => void;
}

export default function EditItemModal({ visible, item, onSave, onClose }: Props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');
  const scaleValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setName(item?.name || '');
      setQuantity(item?.quantity?.toString() || '1');
      setError('');
      
      // Fade in background
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      
      // Scale up modal
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        damping: 20,
      }).start();
    } else {
      // Reset animations when modal is closed
      fadeValue.setValue(0);
      scaleValue.setValue(0);
    }
  }, [visible, item]);

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter an item name');
      return;
    }
    
    const quantityNum = Number(quantity);
    if (isNaN(quantityNum) || quantityNum < 1) {
      setError('Please enter a valid quantity');
      return;
    }
    
    if (item) {
      onSave({ ...item, name: name.trim(), quantity: quantityNum });
    }
  };

  const handleQuantityChange = (value: string) => {
    // Only allow numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setQuantity(value);
      if (error) setError('');
    }
  };

  const handleDecrement = () => {
    const num = Math.max(1, Number(quantity) - 1);
    setQuantity(num.toString());
  };

  const handleIncrement = () => {
    const num = Math.min(99, Number(quantity) + 1);
    setQuantity(num.toString());
  };

  if (!visible || !item) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeValue }]} />
      </TouchableWithoutFeedback>
      
      <View style={styles.modalContainer}>
        <Animated.View 
          style={[
            styles.modalContent,
            { 
              transform: [{ scale: scaleValue }],
              opacity: fadeValue
            }
          ]}
        >
          <TouchableWithoutFeedback>
            <View>
              <View style={styles.header}>
                <Text style={styles.title}>Edit Item</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={24} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (error) setError('');
                  }}
                  style={[styles.input, error && styles.inputError]}
                  placeholder="Enter item name"
                  placeholderTextColor={colors.mediumGray}
                  autoFocus
                  maxLength={30}
                />
              </View>
              
              <View style={styles.quantitySection}>
                <Text style={styles.label}>Quantity</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={[styles.quantityButton, Number(quantity) <= 1 && styles.quantityButtonDisabled]} 
                    onPress={handleDecrement}
                    disabled={Number(quantity) <= 1}
                  >
                    <MaterialIcons 
                      name="remove" 
                      size={20} 
                      color={Number(quantity) <= 1 ? colors.mediumGray : colors.primary} 
                    />
                  </TouchableOpacity>
                  
                  <TextInput
                    value={quantity}
                    onChangeText={handleQuantityChange}
                    style={[styles.quantityInput, error && styles.inputError]}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                  
                  <TouchableOpacity 
                    style={[styles.quantityButton, Number(quantity) >= 99 && styles.quantityButtonDisabled]} 
                    onPress={handleIncrement}
                    disabled={Number(quantity) >= 99}
                  >
                    <MaterialIcons 
                      name="add" 
                      size={20} 
                      color={Number(quantity) >= 99 ? colors.mediumGray : colors.primary} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onClose}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]} 
                  onPress={handleSave}
                  disabled={!name.trim()}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.large,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.large,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  title: {
    ...typography.h4,
    color: colors.text.primary,
    fontWeight: '600',
  },
  closeButton: {
    padding: spacing.xxsmall,
    marginRight: -spacing.xxsmall,
  },
  inputContainer: {
    marginBottom: spacing.medium,
  },
  label: {
    ...typography.caption,
    color: colors.text.primary,
    marginBottom: spacing.xxsmall,
    fontWeight: '500',
  },
  input: {
    ...typography.body,
    color: colors.text.primary,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.small,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: 'rgba(248, 37, 133, 0.05)',
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xxsmall,
  },
  quantitySection: {
    marginTop: spacing.medium,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xxsmall,
  },
  quantityButton: {
    padding: spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityInput: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    minWidth: 40,
    padding: spacing.small,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.large,
  },
  button: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 8,
    marginLeft: spacing.small,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.text.secondary,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
