using ExtractTool.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ExtractTool
{

    public class SportsAPIClient
    {
        private HttpClient Client { get; }

        public SportsAPIClient(HttpClient client)
        {
            Client = client;
            Client.BaseAddress = new Uri("https://sports-decathlon.herokuapp.com/sports/");
        }

        public async Task<IList<Sport>> GetAll()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "");

            var response = await Client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonValue = await response.Content.ReadAsStringAsync();
            JObject jsonObject = JObject.Parse(jsonValue);

            return jsonObject.SelectToken("data").ToObject<List<Sport>>(); ;
        }

        public async Task<Sport> Get(int id)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"{id}");

            var response = await Client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonValue = await response.Content.ReadAsStringAsync();
            JObject jsonObject = JObject.Parse(jsonValue);

            return jsonObject.SelectToken("data").ToObject<Sport>();
        }

        public async Task<int[]> GetRecommendations(int sportId, int count = 3)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"{sportId}/recommendations?count={count}");

            var response = await Client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonValue = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<int[]>(jsonValue);
        }

    }
}
