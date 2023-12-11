import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import ResturantCard from './resturantCard'
import { getFeaturedResturantById } from '../api'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme'

export default function FeatureRow({ id, title, description}) {
  const [resturants, setResturants] = useState([]);

  useEffect(() => {
    getFeaturedResturantById(id).then(data => {
      console.log('got data: ', data);
      console.log('got data 2323: ', data.restaurants.imgUrl);
      console.log(data.restaurants);
      setResturants(data.restaurants);
      console.log(resturants);
    });
  }, [id]);

    
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
          <Text style={{ color: '#888', fontSize: 12 }}>{description}</Text>
        </View>

        <TouchableOpacity>
          <Text style={{ color: themeColors.text, fontWeight: 'bold' }}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        style={{ overflowVisible: true, paddingTop: 5 }}
      >
        {resturants && resturants.map(resturant => (
          
          <ResturantCard
            key={`${id}-${resturant._id}`}
            id={resturant._id}
            imgUrl={resturant.image}
            title={resturant.name}
            rating={resturant.rating}
            type={resturant.type?.name}
            address="123 main street"
            description={resturant.description}
            dishes={resturant.dishes}
            lng={resturant.lng}
            lat={resturant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}